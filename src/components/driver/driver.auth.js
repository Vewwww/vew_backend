const driverModel = require("./driver.model")
const factory = require('../Handlers/auth.factory')

exports.signup=factory.signup(driverModel)
exports.emailVerify=factory.emailVerify(driverModel)
exports.authinticate = factory.authinticate(driverModel)
exports.changePassword = factory.changePassword(driverModel)


