const db = require('../config/db.config.js');
const Log = db.log;

// Post a Customer
exports.create = (req, res) => {
    // Save to postgres database
    let log = req.body;
    Log.create(log).then(result => {
        // Send created log to client
        res.json(result);
    });
};

// Fetch all logs
exports.findAll = (req, res) => {
    Log.findAll().then(log => {
        // Send all logs to Client
        res.json(log);
    });
};

// Find a log by Id
exports.findById = (req, res) => {
    Log.findById(req.params.userName).then(log => {
        res.json(log);
    })
};

//Find a log by type
exports.findByType = (req, res) => {
    Log.findByType(req.params.actionType).then(log => {
        res.json(log);
    })
}