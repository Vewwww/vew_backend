const gasStationModel = require("./gasStation.model");
//const AppErr = require("../../utils/AppErr");
const AppError = require("../utils/AppErr");
const { catchAsyncErr } = require("../utils/CatchAsyncErr");
const factory=require("../handlers/handlers.factory");
//create new gas station

exports.createGasStation = factory.createService(gasStationModel);


//get all gas station

exports.getGasStations = catchAsyncErr(async (req, res, next) => {
  const gasStations = await gasStationModel.find();
  if (!gasStations) { return next(new AppError("no gas stations fount", 404)); }

  res.status(200).json({
    status: "success",
    results: gasStations.length,
    data: gasStations,
  });
});






//get specific gas station with id

exports.getGasStation = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const gasStation = await gasStationModel.findById(id);
  if (!gasStation) {
    return next(new AppError("No gas station found for this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: gasStation,
  });
});



// update specific gas station with id
exports.updateGasStation = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const gasStation = req.body;
  const updatedGasStations = await gasStationModel.findOneAndUpdate({ _id: id }, gasStation, {
    new: true,
  });
  if (!gasStation) {
    return next(new AppError("No gas station found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedGasStations,
  });
});







// delete specific gas station with id

exports.deleteGasStation =  catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedGasStation = await gasStationModel.findOneAndDelete({ _id: id });

  if (!deletedGasStation) {
    return next(new AppError("No gas station found for this id", 404));
  }

  res.status(204).send();
});


