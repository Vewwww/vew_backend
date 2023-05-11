
const driverModel=require("./driver.model")
const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
// to add new user
exports.createUser = catchAsyncErr(async (req, res, next) => {
    const isUser = await driverModel.findOne({ email: req.body.email })
    if (isUser) return next(new AppError("user already exists", 401));

    let User = new driverModel(req.body);
    await User.save();
    res.status(200).json(User);
});

// to get all Users
exports.getUsers = catchAsyncErr(async (req, res) => {
    let Users = await driverModel.find({});
    res.status(200).json(Users);
});

// to get specific User
exports.getUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    let User = await driverModel.findById(id);
    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

// to update specific User
exports.updateUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    let User = await driverModel.findByIdAndUpdate(id,req.body,{ new: true });

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

exports.changePassword = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    req.body.changedPasswordAt = Date.now()
    let User = await driverModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});
exports.deleteUser = catchAsyncErr(async (req, res, next) => {
      const { id } = req.params;
      let user = await driverModel.findByIdAndDelete(id);
      if (!user) {
        return next(new AppError("user not found", 400));
      }
      res.status(200).json({result:user});
    });
  