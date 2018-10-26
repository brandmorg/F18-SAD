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
    let id = req.body.JId;
    Journal.update(user,
        { where: {JId: id}}
    ).then(() => {
        res.status(200).json({msg:"updated successfully a journal with id = " + id});
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
        Journal.findAll(
            /*{
            where: {

                [Op.or]: [{userName: {[Op.like]: '%'+ criteria + '%'}},
                    {userPassword: {[Op.like]: '%'+ criteria + '%'}},
                    {firstName: {[Op.like]: '%'+ criteria + '%'}},
                    {lastName: {[Op.like]: '%'+ criteria + '%'}},
                    {userRole: {[Op.like]: '%'+ criteria + '%'}},
                ]
            },
            order: [[column, direction]]
        }
        */
            ).then(users => {
            // Send all customers to Client
            res.json(users);
        }
        );
    }
    else{
        //if search wasnt entered
        Journal.findAll({
            where: {},
            order: [[column, direction]]
        }).then(users => {
            // Send all customers to Client
            res.json(users);
        });
    }
};