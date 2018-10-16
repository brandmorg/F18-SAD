module.exports = function(app) {

    var journal = require('../controllers/journal.controller.js');

    // Create a new journal
    app.post('/api/journal', journal.create);

    // Retrieve all journals
    app.get('/api/jourmal', journal.findAll);

    // Update a journal
    app.put('/api/users', journal.update);

    // Retrieve a single journal by Id
    app.get('/api/journal:entry', journal.findById);
}