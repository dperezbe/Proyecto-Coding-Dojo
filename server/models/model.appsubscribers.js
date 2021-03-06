var mongoose = require('mongoose');

var schemaAppSubscribers = mongoose.Schema({
    UserId:{
        type: mongoose.Types.ObjectId,
    },
    AppName:{
        type: String
    },
    AppId:{
        type: mongoose.Types.ObjectId,
    },
    Notification: {
        type: Array
    }
  },
  { timestamps: true }
  );

  schemaAppSubscribers.index({ UserId: 1 ,AppId: 1 }, { unique: true})

  module.exports = mongoose.model('appsubscribers', schemaAppSubscribers);