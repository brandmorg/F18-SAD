module.exports = function(app) {

    var journal = require('../controllers/journal.controller.js');

    // Create a new journal
    app.post('/api/journal', journal.create);

    // Retrieve all journals
    app.get('/api/journal', journal.findAll);

    // Update a journal
    app.put('/api/journal', journal.update);

    // Retrieve a single journal by Id
    app.get('/api/journal:entry', journal.findById);
}