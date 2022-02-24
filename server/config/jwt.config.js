const jwt = require('jsonwebtoken');

const clave = 'clavesecreta';
module.exports.clave = clave;

module.exports.authenticate = (req, res, next) =>{
    jwt.verify(req.cookies.usertoken, clave, (err, payload) => {
        if(err) {
            return res.status(401).json({message: 'No autorizado'});
        }
        next();
    });
}