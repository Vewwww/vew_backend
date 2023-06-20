const mechanicModel = require("./mechanicWorkshop.model");
const AppErr = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const { getNearestPlaces } = require("../Handlers/getNearestPlaces");
const factory = require("../Handlers/handler.factory");
const LocationModel = require("../location/location.model");

//rate
exports.rateMechanic=factory.rate(mechanicModel);

//report
exports.reportMechanic=factory.report(mechanicModel);

//create new service
exports.createMechanicWorkshop = factory.createOne(mechanicModel)

exports.getNearestMechanicWorkshop = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  let filter = {};
  if (req.query.service) {
    filter = {
      service: { $type: "array", $elemMatch: { $eq: req.query.service } },
    };
  }
  const manitenceCenters = await mechanicModel
    .find(filter)
    .populate("service");

  searchResult = getNearestPlaces(manitenceCenters, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});

//get all mechanic
exports.getMechanicWorkshops = catchAsyncErr(async (req, res, next) => {
  const mechanics = await mechanicModel.find();
  if (!mechanics) {
    return next(new AppError("no mechanic found", 404));
  }

  res.status(200).json({
    status: "success",
    results: mechanics.length,
    data: mechanics,
  });
});

//get specific mechanic with id

exports.getMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const mechanic = await mechanicModel.findById(id);
  if (!mechanic) {
    return next(new AppError("No mechanic found for this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: mechanic,
  });
});

// update specific mechanic with id
exports.updateMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const mechanic = req.body;
  const updatedMechanic = await mechanicModel.findOneAndUpdate(
    { _id: id },
    mechanic,
    {
      new: true,
    }
  );
  if (!mechanic) {
    return next(new AppError("No mechanic found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedMechanic,
  });
});

// delete specific mechanic with id

exports.deleteMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedMechanic = await mechanicModel.findOneAndDelete({ _id: id });

  if (!deletedMechanic) {
    return next(new AppError("No mechanic found for this id", 404));
  }

  res.status(204).send();
});
