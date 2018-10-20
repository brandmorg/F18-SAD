module.exports = function(app) {

    var users = require('../controllers/users.controller.js');

    // Create a new user
    app.post('/api/users', users.create);

    app.post('/api/userNameCheck', users.compareUserName);

    app.post('/api/passwordCheck', users.compareEmail);


    // Retrieve all users
    app.get('/api/users', users.findAll);

    app.post('/api/usersSort', users.findAllSort);

    // Retrieve a single user by Id
    app.get('/api/users/:userId', users.findById);

    // Update a user with I
    app.put('/api/users', users.update);

    // Delete a user with Id
    app.delete('/api/users/:userId', users.delete);
}