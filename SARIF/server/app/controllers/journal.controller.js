const db = require('../config/db.config.js');
const Journal = db.journal;
const JournalAccounts = db.journalAccounts

exports.create = (req, res) => {
    // Save to postgres database
    let journal = req.body;
    Journal.create(journal).then(result => {
        // Send created customer to client
        res.json(result);
    });
};

// Fetch all Customers
exports.findAll = (req, res) => {
    Journal.findAll({
        include:[
            {
                model: JournalAccounts
            }
        ]
    }).then(users => {
        // Send all customers to Client
        res.json(users);
    });
};

// Find a user by Id
exports.findById = (req, res) => {
    Journal.findById(req.params.JId).then(user => {
        res.json(user);
    })
};

// Update a Customer
exports.update = (req, res) => {
    let user = req.body;
    let id = req.body.JAId;
    Journal.update(user,
        { where: {JAId: id} }
    ).then(() => {
        res.status(200).json({msg:"updated successfully a journal with id = " + id});
    });
};