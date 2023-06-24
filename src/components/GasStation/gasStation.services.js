const gasStationModel = require("./gasStation.model");
const AppErr = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const { getNearestPlaces } = require("../Handlers/getNearestPlaces");
const factory = require("../Handlers/handler.factory");
require("../location/location.model");

exports.getNearestGasStations = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  const gasStations = await gasStationModel.find();
  searchResult = getNearestPlaces(gasStations, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult});
});

exports.createGasStation = factory.createOne(gasStationModel);

exports.getGasStations = factory.getAll(gasStationModel);

//get specific gas station with id
exports.getGasStation = factory.getOne(gasStationModel);

// update specific gas station with id
exports.updateGasStation = factory.updateOne(gasStationModel);

// delete specific gas station with id
exports.deleteGasStation = factory.deleteOne(gasStationModel);
