const db = require('../config/db.config.js');
const sequelize = require('sequelize');
const Users = db.users;
const nodemailer = require('nodemailer');

/*exports.getData = (req, res) => {

};*/

exports.sendInfo = (req, res) => {
    let username = req.body.username;
    var returnString = {exists: 0, question: ' ', answer: ' ' }
    var   access = 1;
    console.log('connection made')
    Users.findOne({where: {userName: username}}).then(function (user) {
        if (!user){
            access = 0;

            res.json(returnString);

        }
        else{

            returnString.exists = 1;
            returnString.question = user.securityQ;
            returnString.answer = user.securityA;
            res.json(returnString);
        }
        console.log('connection made');

    })

};
exports.sendEmail = (req, res) => {
  let username = req.body.userName;
  Users.findOne({where: {userName: username}}).then(function (user) {
      if(user){
          let email = user.email;

          var transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'admin@sarif.financial',
                pass: 'da73ko!RfKXOKJ@',
              }
          });
          /*
           *
              var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'sariffinancialbot@gmail.com',
                  pass: 'ilikemoney123'
           var smtpTransport = nodemailer.createTransport('SMTP',{
               host: 'mail.sarif.financial'
               port: '25'
               secure: 'false'
               auth: {
                   user: 'admin'
                   pass: 'da73ko!RfKXOKJ@'
               }
           };
           *
          */
          var mailOptions = {
              from: 'admin@sarif.financial',
              to: email,
              subject: 'Sarif Financial password reset',
              text: 'A password reset was requested for your account. \n\nPlease click on the link below to verify your email:' // Generate link, consider email template
          };

          transporter.sendMail(mailOptions, function (error, info) {
              if(error){
                  console.log(error);
              }
              else{
                  console.log('Email sent: ' + info.response);
                  res.json(email);
              }
          })
      }
  })
}