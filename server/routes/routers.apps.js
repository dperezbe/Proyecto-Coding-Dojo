const controllerApps = require('../controllers/controller.apps');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/apps',authenticate,controllerApps.GetApps);
    app.get('/api/notification',authenticate,controllerApps.GetNotifications);
    app.get('/api/:id/apps', authenticate, controllerApps.GetAppsByUser);
    app.get('/api/notification/:id',authenticate,controllerApps.GetNotification);
    app.post('/api/app',authenticate,controllerApps.CreateApp);
    app.post('/api/notification',authenticate,controllerApps.CreateNotification);
    app.post('/api/subscriber',authenticate,controllerApps.CreateSubsNotification);
    app.put('/api/subscriber/:id',authenticate,controllerApps.PushSubsNotification);
    app.delete('/api/subscriber/:userid/:notid',authenticate,controllerApps.PopSubsNotification);

}

