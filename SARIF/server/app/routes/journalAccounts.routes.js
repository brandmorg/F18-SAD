module.exports = function(app) {

    var journalAccounts = require('../controllers/journalAccounts.controller.js');

    // Create a new journal
    app.post('/api/journalAccount', journalAccounts.create);

    // Retrieve all journals
    app.get('/api/journalAccount', journalAccounts.findAll);

    // Update a journal
    app.put('/api/usersAccount', journalAccounts.update);

    // Retrieve a single journal by Id
    app.get('/api/journalAccount:entry', journalAccounts.findById);
}