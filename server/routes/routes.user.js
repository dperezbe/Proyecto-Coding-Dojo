const { registrar, login,whoami } = require('../controllers/controller.user');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    
    app.post('/api/user', registrar);
    app.post('/api/login', login);
    app.get('/api/user', authenticate,whoami);
}