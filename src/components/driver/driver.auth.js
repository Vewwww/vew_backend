const driverModel = require("./driver.model")
const factory = require('../Handlers/auth.factory')


exports.signup=factory.signup(driverModel)
exports.emailVerify=factory.emailVerify(driverModel)
exports.authinticate = factory.authinticate(driverModel)
exports.changePassword = factory.changePassword(driverModel)


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
