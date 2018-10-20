module.exports = function(app) {

    var login = require('../controllers/login.controller.js');

    //app.route('/api/loginVerify').get(login.getData).post(login.sendData);

    app.post('/api/loginVerify', login.sendData);

}