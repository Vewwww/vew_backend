const factory = require('../Handlers/handler.factory')
const driverModel=require("./driver.model")
exports.signup=factory.signup(driverModel)
exports.signin=factory.signin(driverModel)