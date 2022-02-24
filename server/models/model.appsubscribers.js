var mongoose = require('mongoose');

var schemaAppSubscribers = mongoose.Schema({
    UserId:{
        type: mongoose.Types.ObjectId,
    },
    Notification: {
        type: Array
    }
  },
  { timestamps: true }
  );

  module.exports = mongoose.model('appsubscribers', schemaAppSubscribers);