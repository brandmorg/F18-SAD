const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Users = db.users;
const Op = Sequelize.Op;

// Post a Customer
exports.create = (req, res) => {
    // Save to postgres database
    let user = req.body;
    Users.create(user).then(result => {
        // Send created customer to client
        res.json(result);
    });
};

//checks if a username already exists
exports.compareUserName = (req, res) => {
    let userName = req.body.username;
    Users.findOne({where: {userName: userName}}).then( user => {
        if(!user){
            res.json(1);
        }
        else{
            res.json(2);
        }
    });
};
//checks if an email already exists
exports.compareEmail = (req, res) => {
    let email = req.body.email;
    Users.findOne({where: {email: email}}).then( user => {
        if(!user){
            res.json(1);
        }
        else{
            res.json(2);
        }
    });
};


// Fetch all Customers
exports.findAll = (req, res) => {
    Users.findAll( {where: {},
    order: [['userId', 'ASC']]}).then(users => {

        // Send all customers to Client
        res.json(users);
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
        Users.findAll({
            where: {
               [Op.or]: [{userName: {[Op.like]: '%'+ criteria + '%'}},
                   {userPassword: {[Op.like]: '%'+ criteria + '%'}},
                   {firstName: {[Op.like]: '%'+ criteria + '%'}},
                   {lastName: {[Op.like]: '%'+ criteria + '%'}},
                   {userRole: {[Op.like]: '%'+ criteria + '%'}},
                   ]
            },
            order: [[column, direction]]
        }).then(users => {
            // Send all customers to Client
            res.json(users);
        });
    }
    else{
        //if search wasnt entered
        Users.findAll({
            where: {},
            order: [[column, direction]]
        }).then(users => {
            // Send all customers to Client
            res.json(users);
        });
    }
};

// Find a user by Id
exports.findById = (req, res) => {
    Users.findById(req.params.userId).then(user => {
        res.json(user);
    })
};

// Update a Customer
exports.update = (req, res) => {
    let user = req.body;
    let id = req.body.userId;
    Users.update(user,
        { where: {userId: id} }
    ).then(() => {
        res.status(200).json({msg:"updated successfully a customer with id = " + id});
    });
};

// Delete a user by Id
exports.delete = (req, res) => {
    const id = req.params.userId;
    Users.destroy({
        where: { userId: id }
    }).then(() => {
        res.status(200).json({msg:'deleted successfully a customer with id = ' + id});
    });
};