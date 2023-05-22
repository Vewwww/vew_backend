const express = require("express");
const gasStationModel = require("./gasStation.model");
const router = express.Router();
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
require("../location/location.model");

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
