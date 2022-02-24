var mongoose = require('mongoose');

var schemaAppOwner = mongoose.Schema({
    UserId:{
        type: mongoose.Types.ObjectId,
    },
    AppName: {
        type: String,
        require: [true, "{PATH es requerido}"],
        minLength: [3, "{PATH} debe tener al menos {MINLENGTH} caracteres"]
    },
    AppDescription: {
        type: String,
        require: [true, "{PATH es requerido}"],
        minLength: [3, "{PATH} debe tener al menos {MINLENGTH} caracteres"]
    }
  },
  { timestamps: true }
  );

  module.exports = mongoose.model('appowner', schemaAppOwner);