const db = require('../config/db.config.js');
const Users = db.users;

// Post a Customer
exports.create = (req, res) => {
    // Save to postgres database
    let user = req.body;
    Users.create(user).then(result => {
        // Send created customer to client
        res.json(result);
    });
};

// Fetch all Customers
exports.findAll = (req, res) => {
    Users.findAll().then(users => {
        // Send all customers to Client
        res.json(users);
    });
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
    let id = req.body.id;
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