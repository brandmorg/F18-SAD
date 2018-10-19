const db = require('../config/db.config.js');
const ChartAccount = db.chartAccount;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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

//checks for a similar account name
exports.compareAccountName = (req, res) => {
    let accountName = req.body.accountName;
    ChartAccount.findOne({where: {accountName: accountName}}).then( account => {
        if(!account){
            res.json(1);
        }
        else{
            res.json(2);
        }
    });
};
//checks for a similar account number
exports.compareAccountNumber = (req, res) => {
    let accountNumber = req.body.accountNumber;
    ChartAccount.findOne({where: {accountNumber: accountNumber}}).then( account => {
        if(!account){
            res.json(1);
        }
        else{
            res.json(2);
        }
    });
};

exports.findAllSort = (req, res) => {
    let column = req.body.column;
    let direction = req.body.direction;
    let columnSearch = req.body.columnSearch;
    let criteria = req.body.criteria;
    //if search is set to all and there is criteria input
    if(columnSearch == 'all' && criteria!= '') {
        //if a search is entered
        ChartAccount.findAll({
            where: {
                [Op.or]: [{accountName: {[Op.like]: '%'+ criteria + '%'}},
                    {accountType: {[Op.like]: '%'+ criteria + '%'}},
                    {accountSubType: {[Op.like]: '%'+ criteria + '%'}},
                    {comment : {[Op.like]: '%'+ criteria + '%'}},
                ]
            },
            order: [[column, direction]]
        }).then(accounts => {
            // Send all customers to Client
            res.json(accounts);
        });
    }
    else{
        //if search wasnt entered
        ChartAccount.findAll({
            where: {},
            order: [[column, direction]]
        }).then(accounts => {
            // Send all customers to Client
            res.json(accounts);
        });
    }
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