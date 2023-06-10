const gasStationModel = require("./gasStation.model");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");
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

exports.getNearestGasStations = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  const manitenceCenters = await gasStationModel.find().populate({
    path: "location",
    select: "latitude longitude -_id",
  });

  searchResult = getNearestPlaces(manitenceCenters, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});




// router.post("/", async (req, res) => {
//   await gasStationModel.create({
//     name: req.body.name,
//     rate: req.body.rate,
//     location: req.body.location,
//   });
//   res.send({ message: "created" });
// });

// router.get("/", async (req, res) => {
//   try {
//     res.send(await gasStationModel.find());
//   } catch (error) {
//     res.status(404).send({ message: "not found" });
//   }
// });

// router.get("/one", async (req, res) => {
//   try {
//     gasStationName = req.body.name;
//     res.send(await gasStationModel.findOne({ name: gasStationName }));
//   } catch (error) {
//     res.status(404).send({ message: "not found" });
//   }
// });

// router.patch("/", async (req, res) => {
//   try {
//     newId = req.body.id;
//     newName = req.body.name;
//     newRate = req.body.rate;
//     newLocation = req.body.location;
//     await gasStationModel.findByIdAndUpdate(newId, {
//       name: newName,
//       rate: newRate,
//       location: newLocation,
//     });
//     res.send({ message: "updated" });
//   } catch (error) {
//     res.status(404).send({ message: "is not updated" });
//   }
// });

// router.delete("/", async (req, res) => {
//   try {
//     name = req.body.name;
//     await gasStationModel.findOneAndDelete({ name: name });
//     res.send({ message: "deleted" });
//   } catch (error) {
//     res.status(404).send({ message: "is not deleted" });
//   }
// });

// module.exports = {
//   router,
//   getNearestGasStations,
// };

