const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "El nombre es requerido"]
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "El email es inválido"],
      unique: [true, 'El email ya está en uso']
    },
    password: {
      type: String,
      required: [true, "La clave es requerida"],
      minlength: [6, "La clave debe tener 6 caracteres como mínimo"]
    },
    celular: {
      type: Number,
      minlength: [11, "El celular debe contener 11 numeros"]
    },
  }, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las claves no son iguales');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;