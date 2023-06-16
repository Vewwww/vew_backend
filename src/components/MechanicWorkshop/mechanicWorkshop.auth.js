const authFactory = require("../Handlers/auth.factory");
const mechanicModel = require("./mechanicWorkshop.model");

exports.signup = authFactory.signup(mechanicModel);
exports.emailVerify = authFactory.emailVerify(mechanicModel);
exports.authinticate = authFactory.authinticate(mechanicModel);
exports.changePassword = authFactory.changePassword(mechanicModel);
