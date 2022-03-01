const appowner = require("../models/model.appowner");
const appnotification = require("../models/model.appnotification");
const appsubscribers = require("../models/model.appsubscribers");
const appuserdata = require("../models/model.user");
const requestwp = require('request');


const { default: mongoose } = require("mongoose");
const { request } = require("express");

module.exports.GetApps = (request, response) => {
  appowner
    .find({})
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.GetSubscriber = (request, response) => {
  appsubscribers
    .find({ UserId: request.params.userid })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.GetSubscriberNoti = (request, response) => {
  activenotifications(response ,request.params.userid)
  
};

module.exports.GetAppsubsbyAppId = (request, response) => {
  appsubscribers
    .find({ AppId: request.params.id })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.GetNotifications = (request, response) => {
  appnotification
    .find({})
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.CreateApp = (request, response) => {
  appowner
    .create(request.body)
    .then((app) => response.json(app))
    .catch((err) => response.status(400).json(err));
};

module.exports.GetAppsByOwner = (request, response) => {
  appowner
    .find({ UserId: request.params.id })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.GetAppByAppId = (request, response) => {
  appowner
    .findById(request.params.id)
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.CreateNotification = (request, response) => {
  request.body._id = new mongoose.Types.ObjectId();

  appnotification
    .create(request.body)
    .then((app) => response.json(app))
    .catch((err) => response.status(400).json(err));

  updateNotification(request.body.AppId, request.body._id);
};

module.exports.GetNotificationbyapp = (request, response) => {
  appowner
    .findById(request.params.id)
    .then((k) =>
      appnotification
        .find({ AppId: request.params.id })
        .then((p) => response.json({ notification: p, AppName: k.AppName }))
        .catch((err) => response.status(400).json(err))
    )
    .catch((err) => response.status(400).json(err));
};

module.exports.GetNotification = (request, response) => {
  appnotification
    .findById(request.params.id)
    .then((noti) => response.json(noti))
    .catch((err) => response.status(400).json(err));
};

module.exports.CreateSubsNotification = (request, response) => {
  appsubscribers
    .create(request.body)
    .then((subs) => response.json(subs))
    .catch((err) => response.status(400).json(err));
};

module.exports.PushSubsNotification = (request, response) => {
  appsubscribers
    .findOneAndUpdate(
      { UserId: request.params.id },
      { $push: request.body },
      { new: true }
    )
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
};

module.exports.PopSubsNotification = (request, response) => {
  const userid = request.params.userid;
  const notid = request.params.notid;
  appsubscribers
    .updateOne(
      { UserId: request.params.userid },
      { $pull: { Notification: notid } },
      { new: true }
    )
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
};


module.exports.DeleteSuscriber = (request, response) => {
  appsubscribers
    .findOneAndDelete(
      { _id: request.params.id },
    )
    .then((data) => response.json({error:"false",data:"deleted"}))
    .catch((err) => response.json(err));
};


module.exports.CountMyApps = (request, response) => {
  appowner
    .find({ UserId: request.params.id })
    .count()
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
};

module.exports.CountMySubs = (request, response) => {
  appsubscribers
    .find({ UserId: request.params.id })
    .count()
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
};

module.exports.SendNotification = (request, response) => {
  updateNotification(request.params.id);
  response.json(true);
};

module.exports.SendWhatsapp = (request, response) => {
  PostCode("este es un mensaje");
  response.json(true);
};

updateNotification = (appid, notid) => {
  appsubscribers
    .find({ AppId: appid })
    .then((apps) => {
      apps.forEach((t) => {
        pushnotification(t._id, notid,t.UserId);
      });
    })
    .catch((err) => response.status(400).json(err));
};

pushnotification = (id, notid,userid) => {
  appsubscribers
    .findOneAndUpdate(
      { _id: id },
      { $push: { Notification: notid } },
      { new: true }
    )
    .then((data) => data)
    .catch((err) => console.log(err));

    appuserdata
    .findById(userid)
    .then(data => PostCode(data.celular, notid))
    .catch((err) => console.log(err));

};

activenotifications = (response,id) => {
  appsubscribers
    .find({ UserId: id })
    .then((apps) => {
      let m1 = [];
      apps.map((app) =>
        app.Notification.map((t) => {
          m1.push(t);
        })
      );
      return m1;
    })
    .then((apps) => {
      let promisesArray = datanotifications(apps);
      Promise.all(promisesArray).then(function (app) {
        response.json(app)
    });
      
    })
    .catch((err) => console.log(err));
};

datanotifications = (n) => {
  let aux = [];
  
  for (const property in n) {
    aux.push(datanotification(n[property]))
  }


return  aux;
};

datanotification = (n) =>{
    
    let data = appnotification.findById(n).then((noti) => {
      return noti
    });
    return data;
}


function PostCode(celular,mensajeid) {
  datanotification(mensajeid)
  .then(noti => {
  requestwp.post('https://api.gupshup.io/sm/api/v1/msg', {
    form: {
      'channel': 'whatsapp',
      'source': '917834811114',
      'destination': `${celular}`,
      'message' : `{"type":"text","text":"${noti.Message}"}`,
      'src.name' : 'Test2Diego'
    },
    headers: {
      'apikey': 'shxiwbcljbtjguuilsmxqi8a7ltkkhvi'
    }
  })
})
  return true;
}