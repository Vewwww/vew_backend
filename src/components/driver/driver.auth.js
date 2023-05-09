const driverModel = require("./driver.model")
const factory = require('../Handlers/handler.factory')
const { catchAsyncErr } = require("../../utils/CatchAsyncErr")
const jwt = require('jsonwebtoken');
const AppError = require("../../utils/AppError")
exports.signup=factory.signup(driverModel)
exports.signin=factory.signin()
exports.emailVerify=factory.emailVerify(driverModel)

exports.ProtectedRoutes = catchAsyncErr(async (req, res, next) => {
    //1) token provided or not
    let token = req.headers.token
    if (!token) return next(new AppError("token not provided", 401))
    //2) token valid or not iat>>intaiated at gwa decoded
    let deocded = jwt.verify(token, process.env.JWT_KEY)

    //3 check if user exist or not law el sha5s da etrafad mn el sherka
    let user = await driverModel.findById(deocded.userId);
    if (!user) return next(new AppError("user not found", 401));
    // change paswsord

    if (user.changedPasswordAt) {
        changedAt = parseInt(user.changedPasswordAt.getTime() / 1000)
        if (changedAt > deocded.iat)
            return next(new AppError("invalid token", 401));
    }

    req.user = user
    next()
})
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
// exports.updateUser = catchAsyncErr(async (req, res, next) => {
//     const { id } = req.params;
//     let User = await driverModel.findByIdAndUpdate(id,req.body,{ new: true });

//     !User && next(new AppError("User not found", 400));
//     User && res.status(200).json(User);
// });

// exports.changePassword = catchAsyncErr(async (req, res, next) => {
//     const { id } = req.params;
//     req.body.changedPasswordAt = Date.now()
//     let User = await driverModel.findByIdAndUpdate(
//         id,
//         req.body,
//         { new: true }
//     );

//     !User && next(new AppError("User not found", 400));
//     User && res.status(200).json(User);
// });
