const locationModel = require("./location.model");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");

//@desc   create location
//@route  POST /api/v1/location
//@access Private
exports.createLocation = factory.createService(locationModel);



exports.getLocations = catchAsyncErr(async (req, res, next) => {
  const locations = await locationModel.find();
  if (!locations) { return next(new AppError("no location fount", 404)); }

  res.status(200).json({
    status: "success",
    results: locations.length,
    data: locations,
  });
});


//get specific location with id

exports.getLocation = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const location = await locationModel.findById(id);
  if (!location) {
    return next(new AppError("No location found for this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: location,
  });
});
// update specific location with id
exports.updateLocation = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const location = req.body;
  const updatedLocation = await locationModel.findOneAndUpdate({ _id: id }, location, {
    new: true,
  });
  if (!location) {
    return next(new AppError("No location found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedLocation,
  });
});

// delete specific location with id

exports.deleteLocation = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedLocation = await locationModel.findOneAndDelete({ _id: id });

  if (!deletedLocation) {
    return next(new AppError("No location found for this id", 404));
  }

  res.status(204).send();
});