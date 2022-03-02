const controllerApps = require('../controllers/controller.apps');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/app',authenticate,controllerApps.GetApps);
    app.get('/api/notification',authenticate,controllerApps.GetNotifications);
    app.get('/api/app/owner/:id', authenticate, controllerApps.GetAppsByOwner);
    app.get('/api/app/appId/:id', authenticate, controllerApps.GetAppByAppId);
    app.get('/api/notificationbyapp/:id',authenticate,controllerApps.GetNotificationbyapp);
    app.get('/api/notiapp/:id',authenticate,controllerApps.GetNotibyapp);
    app.get('/api/notification/:id',authenticate,controllerApps.GetNotification);
    app.get('/api/subscribernoti/:userid',authenticate,controllerApps.GetSubscriberNoti);
    app.get('/api/subscriber/:userid',authenticate,controllerApps.GetSubscriber);
    app.get('/api/appsubscribers/:id',authenticate,controllerApps.GetAppsubsbyAppId);
    app.get('/api/countapp/:id',authenticate,controllerApps.CountMyApps);
    app.get('/api/countsubs/:id',authenticate,controllerApps.CountMySubs);

    app.post('/api/app',authenticate,controllerApps.CreateApp);
    app.post('/api/notification',authenticate,controllerApps.CreateNotification);
    app.post('/api/subscriber',authenticate,controllerApps.CreateSubsNotification);
    app.post('/api/sendnotification/:id',authenticate,controllerApps.SendNotification);
    app.post('/api/send',controllerApps.SendWhatsapp);


    app.put('/api/subscriber/:id',authenticate,controllerApps.PushSubsNotification);
    app.delete('/api/suscriber/:id',authenticate,controllerApps.DeleteSuscriber);
    app.delete('/api/app/:id',authenticate,controllerApps.DeleteApp);    
    app.delete('/api/notification/:userid/:notid',authenticate,controllerApps.PopSubsNotification);

}

