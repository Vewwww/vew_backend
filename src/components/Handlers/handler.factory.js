const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const driverModel = require("../driver/driver.model");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const gasStationModel = require("../GasStation/gasStation.model");
const maintenanceCenterModel = require("../MaintenanceCenter/maintenanceCenter.model");
const winchModel = require("../winch/winch.model");
const { sendEmail } = require("./email.factory");

exports.signup = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    email = req.body.email;
    const isUser = await model.findOne({ email });
    if (isUser) return next(new AppError("user already exists", 401));

    let User = new model(req.body);
    await User.save();
    let token = jwt.sign({ email }, process.env.EMAIL_JWT_KEY);
    await sendEmail({ email, token, message: "Hello" });
    res.status(200).json(User);
  });
};
exports.signin = () => {
  return catchAsyncErr(async (req, res, next) => {
    let user = await driverModel.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      user = await mechanicWorkshopModel.findOne({ email: req.body.email });
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        user = await winchModel.findOne({ email: req.body.email });
        if (
          !user ||
          !(await bcrypt.compare(req.body.password, user.password))
        ) {
          return next(new AppError("incorrect email or password", 401));
        }
      }
    }

    let token = jwt.sign(
      { name: user.name, userId: user._id },
      process.env.JWT_KEY
    );
    if (user.emailConfirm == true) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Please confirm your email" });
    }
  });
};
exports.emailVerify = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    const { token } = req.params;
    jwt.verify(token, process.env.EMAIL_JWT_KEY, async (err, decoded) => {
      if (err) {
        return next(new AppError("invalid token", 401));
      } else {
        let user = await model.findOne({ email: decoded.email });
        if (user) {
          await model.findOneAndUpdate(
            { email: decoded.email },
            { emailConfirm: true }
          );
          res.json({ message: "verified" });
        } else {
          res.json({ message: "user not found" });
        }
      }
    });
  });
};

exports.search = asyncHandler(async (req, res, next) => {
  const { keyword } = req.query;
  const { latitude, longitude } = req.body;

  const ar_en_name_query = {
    $or: [
      { "name.ar": { $regex: ".*" + keyword + ".*", $options: "i" } },
      { "name.en": { $regex: ".*" + keyword + ".*", $options: "i" } },
    ],
  };

  const name_query = {
    name: { $regex: ".*" + keyword + ".*", $options: "i" },
  };

  if (keyword) {
    const workshops = await mechanicWorkshopModel
      .find(name_query)
      .populate("location");
    const maintenceCenters = await maintenanceCenterModel
      .find(ar_en_name_query)
      .populate("location");
    const gasStations = await gasStationModel
      .find(name_query)
      .populate("location");

    let searchResult = [];
    if (workshops) searchResult.push(...workshops);
    if (maintenceCenters) searchResult.push(...maintenceCenters);
    if (gasStations) searchResult.push(...gasStations);

    searchResult = getNearestPlaces(searchResult, latitude, longitude);

    res.status(200).json({ results: searchResult.length, data: searchResult });
  } else {
    return next(AppError("No search keyword is provided", 400));
  }
});
