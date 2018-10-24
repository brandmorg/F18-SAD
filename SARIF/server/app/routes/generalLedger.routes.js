module.exports = function(app) {

    var generalLedger = require('../controllers/generalLedger.controller.js');

    // Create a new journal
    app.post('/api/generalLedger', generalLedger.create);

    // Retrieve all journals
    app.get('/api/generalLedger', generalLedger.findAll);

    // Update a journal
    app.put('/api/generalLedger', generalLedger.update);

    // Retrieve a single journal by Id
    app.get('/api/generalLedger:entry', generalLedger.findById);
}