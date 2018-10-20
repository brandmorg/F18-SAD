const db = require('../config/db.config.js');
const JournalAccount = db.journalAccounts;

exports.create = (req, res) => {
    // Save to postgres database
    let journal = req.body;
    JournalAccount.create(journal).then(result => {
        // Send created customer to client
        res.json(result);
    });
};

// Fetch all Customers
exports.findAll = (req, res) => {
    JournalAccount.findAll().then(users => {
        // Send all customers to Client
        res.json(users);
    });
};

// Find a user by Id
exports.findById = (req, res) => {
    JournalAccount.findById(req.params.JId).then(user => {
        res.json(user);
    })
};

// Update a Customer
exports.update = (req, res) => {
    let user = req.body;
    let id = req.body.JId;
    JournalAccount.update(user,
        { where: {JId: id} }
    ).then(() => {
        res.status(200).json({msg:"updated successfully a journal with id = " + id});
    });
};