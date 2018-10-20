const db = require('../config/db.config.js');
const sequelize = require('sequelize');
const Users = db.users;

/*exports.getData = (req, res) => {

};*/

exports.sendData = (req, res) => {
    let username = req.body.userName,
        password = req.body.userPassword;
    var   access = 1;
    console.log("connection made")
    Users.findOne({where: {userName: username}}).then(function (user) {
        if (!user){
            access = 0;
            let user = {
                userId: -1,
                userName: "temp",
                userPassword: "Temp",
                userRole: "Temp"
            }

            res.json(user);

        }
        else if(user.active == 0){
            let user = {
                userId: -2,
                username: "temp",
                userPassword: "Temp",
                userRole: "Temp"
            }
            res.json(user);
        }
        else if (user.userPassword != password){
            let user = {
                userId: -1,
                userName: "Temp",
                userPassword: "Temp",
                userRole: "Temp"
            }
            res.json(user);
        }

        else{
            res.json(user);
        }
        console.log("connection made");

    })

};