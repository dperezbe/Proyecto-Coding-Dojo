const User = require('../models/model.user');
const jwt = require('jsonwebtoken');
const {clave} = require('../config/jwt.config');
const bcrypt = require('bcrypt');

module.exports.registrar = (req, res) => {
    const user = req.body;
    User.create(user)
        .then(data => res.json({ data: null, message: null, error: false}))
        .catch(error => res.json({ data: null, message: error, error: true}));
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user === null) {
            return res.json({ msg: "Usuario o clave inválido", error: true });
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(passwordIsValid => {
                    if (passwordIsValid) {
                        const datos = {
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        };
                        const newJWT = jwt.sign(datos, clave);
                        return res.cookie("usertoken", newJWT, clave, {
                            httpOnly: true
                        }).json({ data: datos, msg: "success!", error: false });
                    } else {
                      return  res.json({ msg: "Usuario o clave inválido", error: true });
                    }
                })
        }
      }).catch(err =>  res.json(err));
  };

module.exports.whoami = (req,res) =>{
    const token = req.cookies;
    const verified = jwt.verify(token.usertoken, clave);
    if(verified){
       return res.send({status: "success",data: verified});
    }else{
       // Access Denied
       return res.status(401).send(error);
    }
};

