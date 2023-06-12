const driverModel = require("./driver.model")
const factory = require('../Handlers/handler.factory')
const { catchAsyncErr } = require("../../utils/CatchAsyncErr")
const jwt = require('jsonwebtoken');
const AppError = require("../../utils/AppError")
exports.signup=factory.signup(driverModel)
exports.emailVerify=factory.emailVerify(driverModel)
exports.authenticate=factory.authinticate()
exports.changePassword=factory.changePassword(driverModel)


//allowedTo('admin,'driver,)
//['admin,'driver']
exports.allowedTo = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError("you are not authorized to access this route", 401));

        next()
    }

}

// to update specific User
exports.updateUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    let User = await driverModel.findByIdAndUpdate(id,req.body,{ new: true });

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});


