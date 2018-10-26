const db = require('../config/db.config.js');
const GLedger = db.generalLedger;

exports.create = (req, res) => {
    // Save to postgres database
    let ledger = req.body;
    GLedger.create(ledger).then(result => {
        // Send created customer to client
        res.json(result);
    });
};

// Fetch all Customers
exports.findAll = (req, res) => {
    GLedger.findAll().then(ledgers => {
        // Send all customers to Client
        res.json(ledgers);
    });
};

// Find a user by Id
exports.findById = (req, res) => {
    GLedger.findById(req.params.glId).then(user => {
        res.json(user);
    })
};

// Update a Customer
exports.update = (req, res) => {
    let user = req.body;
    let id = req.body.glId;
    GLedger.update(user,
        { where: {glId: id} }
    ).then(() => {
        res.status(200).json({msg:"updated successfully a journal with id = " + id});
    });
};