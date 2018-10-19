module.exports = function(app) {

    var accounts = require('../controllers/chartAccount.controller.js');

    // Create a new account
    app.post('/api/chartOfAccounts', accounts.create);

    // Retrieve all accounts
    app.get('/api/chartOfAccounts', accounts.findAll);

    app.post('/api/chartSort', accounts.findAllSort);

    // Retrieve a single account by Id
    app.get('/api/chartOfAccounts/:caId', accounts.findById);

    // update a single account with Id
    app.put('/api/chartOfAccounts', accounts.update);
}