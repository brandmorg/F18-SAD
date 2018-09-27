const db = require('../config/db.config.js');
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
            res.json(access);
        }
        else if (user.userPassword != password){
            access = 0;
            res.json(access);
        }
        else{
            res.json(access);
        }
        console.log("connection made");

    })

};

