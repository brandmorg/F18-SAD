module.exports = function(app) {

    var reset = require('../controllers/passwrodReset.controller.js');

    //app.route('/api/loginVerify').get(login.getData).post(login.sendData);

    app.post('/api/resetPassword', reset.sendInfo);

    app.post('/api/emailSend', reset.sendEmail);

}