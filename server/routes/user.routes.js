const UserController = require('../controllers/user.controller');
const EventController = require('../controllers/event.controller');
const InviteController = require('../controllers/invite.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) =>{
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
    app.post('/api/event/new', authenticate, EventController.createEvent);
    app.get('/api/events', authenticate, UserController.getUserEvents);
    app.get('/api/user/invites', authenticate, InviteController.getUserInvites)
    app.get('/api/event/:id', authenticate, EventController.getOneEvent);
    app.get('/api/user/:email', authenticate, UserController.getUserByEmail);
    app.put('/api/event/:id', authenticate, EventController.updateEvent);
    app.get('/api/invite/:id', authenticate, InviteController.getOneInvitation)
    app.post('/api/:id/invite', authenticate, InviteController.createInvite);
    app.put('/api/invitation/:id/update' ,authenticate, InviteController.updateResponse)
    app.delete('/api/event/:id/cancel', authenticate, EventController.cancelEvent)
}