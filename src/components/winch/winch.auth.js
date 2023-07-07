const authFactory = require('../Handlers/auth.factory');
const winchModel = require('./winch.model');

exports.signup = authFactory.signup(winchModel);
exports.emailVerify = authFactory.emailVerify(winchModel);
exports.authinticate = authFactory.authinticate(winchModel);
exports.changePassword = authFactory.changePassword(winchModel);

