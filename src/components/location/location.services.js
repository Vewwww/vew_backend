const asyncHandler = require("express-async-handler");
const AppErr = require("../../utils/AppErr");
const locationModel = require("./location.model");

//@desc   create location
//@route  POST /api/v1/location
//@access Private
exports.createLocation = asyncHandler(async (req, res) => {
  const  location  = req.body;
  const createdLocation = await locationModel.create(location);

  res.status(200).json({
    status: "success",
    data: createdLocation,
  });
});


exports.getLocations = asyncHandler(async (req, res) => {
  const locations = await locationModel.find();

  res.status(200).json({
    status: "success",
    results: locations.length,
    data: locations,
  });
});  



//get specific location with id

exports.getLocation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const _location = await locationModel.findById(id);
  if (!_location) {
    return next(new AppErr("No location found for this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: _location,
  });
});

// update specific location with id
exports.updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const  _location  = req.body;
  const updatedLocation = await locationModel.findOneAndUpdate({ _id: id }, _location, {
    new: true,
  });

  console.log(_location);

  if (!updatedLocation) {
    return next(new AppErr("No location found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedLocation,
  });
});

// delete specific location with id

exports.deleteLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedLocation = await locationModel.findOneAndDelete({ _id: id });

  if (!deletedLocation) {
    return next(new AppErr("No location found for this id", 404));
  }

  res.status(204).send();
});