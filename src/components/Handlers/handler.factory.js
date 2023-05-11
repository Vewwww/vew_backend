const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const maintenanceCenterModel = require("../MaintenanceCenter/maintenanceCenter.model");
const gasStationModel = require("../GasStation/gasStation.model");
const { getNearestPlaces } = require("./getNearestPlacesjs");

exports.signup = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    const isUser = await model.findOne({ email: req.body.email });
    if (isUser) return next(new AppError("user already exists", 401));

    let User = new model(req.body);
    await User.save();
    res.status(200).json(User);
  });
};
exports.signin = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    const user = await model.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return next(new AppError("incorrect email or password", 401));

    let token = jwt.sign(
      { name: user.name, userId: user._id },
      process.env.JWT_KEY
    );

    res.status(200).json({ token });
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
