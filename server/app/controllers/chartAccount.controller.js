const db = require('../config/db.config.js');
const ChartAccount = db.chartAccount;


// Post an account
exports.create = (req, res) => {
    // Save to postgres database
    let account = req.body;
    ChartAccount.create(account).then(result => {
        // Send created account to client
        res.json(result);
    });
};

// Fetch all logs
exports.findAll = (req, res) => {
    ChartAccount.findAll().then(account => {
        // Send all logs to Client
        res.json(account);
    });
};

// Find a log by Id
exports.findById = (req, res) => {
    ChartAccount.findById(req.params.caId).then(account => {
        res.json(account);
    })
};

exports.update = (req, res) => {
    let account = req.body;
    let id = req.body.caId;
    ChartAccount.update(account,
        { where: {caId: id} }
    ).then(() => {
        res.status(200).json({msg:"updated successfully a customer with id = " + id});
    });
};


// Find all entries with a matching name
exports.GetAllNames = (req, res) => {

    let name = req.body.accountName;
    ChartAccount.findAll({
            where: { accountName: name }
        }
    ).then(account => {
        // Send all customers to Client
        res.json(account);
    });
};


// Find all entries with a matching code
exports.GetAllCodes = (req, res) => {

    let code = req.body.code;
    ChartAccount.findAll({
            where: { code: code }
        }
    ).then(account => {
        // Send all customers to Client
        res.json(account);
    });
};