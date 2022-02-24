var mongoose = require('mongoose');

var schemaAppNotification = mongoose.Schema({
    AppId:{
        type: mongoose.Types.ObjectId,
    },
    Message: {
        type: String,
        require: [true, "{PATH es requerido}"],
        minLength: [10, "{PATH} debe tener al menos {MINLENGTH} caracteres"]
    }
  },
  { timestamps: true }
  );

  module.exports = mongoose.model('appNotification', schemaAppNotification);