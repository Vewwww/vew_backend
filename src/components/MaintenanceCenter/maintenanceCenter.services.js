const MaintanenceCenterModel = require("./maintenanceCenter.model");
const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const { getNearestPlaces } = require("../Handlers/getNearestPlaces");
const factory=require("../Handlers/handler.factory");
require("../location/location.model");
require("../carType/carType.model");
//create new service

exports.createMaintenanceCenter = factory.createOne(MaintanenceCenterModel);
exports.getNearestMaintenanceCenters = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  let filter = {};
  if (req.query.carType) {
    filter = {
      carType: { $type: "array", $elemMatch: { $eq: req.query.carType } },
    };
  }
  const manitenceCenters = await MaintanenceCenterModel.find(filter)
    .populate({ path: "location", select: "latitude longitude -_id" })
    .populate("carType");

  searchResult = getNearestPlaces(manitenceCenters, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});



//get all maintenance center

exports.getMaintenanceCenters = catchAsyncErr(async (req, res, next) => {
  const maintenanceCenters = await MaintanenceCenterModel.find();
  if (!maintenanceCenters) { return next(new AppError("no maintenance center fount", 404)); }

  res.status(200).json({
    status: "success",
    results: maintenanceCenters.length,
    data: maintenanceCenters,
  });
});






//get specific maintenance center with id

exports.getMaintenanceCenter = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const maintenanceCenter = await MaintanenceCenterModel.findById(id);
  if (!maintenanceCenter) {
    return next(new AppError("No maintenance center found for this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: maintenanceCenter,
  });
});



// update specific maintenance center with id
exports.updateMaintenanceCenter = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const maintenanceCenter = req.body;
  const updatedMaintenanceCenter = await MaintanenceCenterModel.findOneAndUpdate({ _id: id }, maintenanceCenter, {
    new: true,
  });
  if (!maintenanceCenter) {
    return next(new AppError("No maintenance center found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedMaintenanceCenter,
  });
});







// delete specific maintenance center with id

exports.deleteMaintenanceCenter =  catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedMaintenanceCenter = await MaintanenceCenterModel.findOneAndDelete({ _id: id });

  if (!deletedMaintenanceCenter) {
    return next(new AppError("No maintenance center found for this id", 404));
  }

  res.status(204).send();
});


/*
const express = require("express");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const MaintanenceCenterModel = require("./maintenanceCenter.model");
const { getNearestPlaces } = require("../Handlers/getNearestPlaces");
require("../location/location.model");
const router = express.Router();



router.post("/", async (req, res) => {
  await MaintanenceCenterModel.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    carType: req.body.carType,
    isVerified: req.body.isVerified,
    rate: req.body.rate,
  });
  res.send({ message: "created" });
});

router.get("/", async (req, res) => {
  try {
    res.send(await MaintanenceCenterModel.find());
  } catch (error) {
    res.status(404).send({ message: "not found" });
  }
});

router.get("/one", async (req, res) => {
  try {
    (maintanenceName = req.body.name),
      res.send(await MaintanenceCenterModel.findOne({ name: maintanenceName }));
  } catch (error) {
    res.status(404).send({ message: "not found" });
  }
});

router.patch("/", async (req, res) => {
  try {
    newId = req.body.id;
    newName = req.body.name;
    newphoneNumber = req.body.phoneNumber;
    (newCarType = req.body.carType),
      (newIsVerified = req.body.isVerified),
      (newRate = req.body.rate);
    await MaintanenceCenterModel.findByIdAndUpdate(newId, {
      name: newName,
      phoneNumber: newphoneNumber,
      carType: newCarType,
      isVerified: newIsVerified,
      rate: newRate,
    });
    res.send({ message: "updated" });
  } catch (error) {
    res.status(404).send({ message: "is not updated" });
  }
});

router.delete("/", async (req, res) => {
  try {
    name = req.body.name;
    await MaintanenceCenterModel.findOneAndDelete({ name: name });
    res.send({ message: "deleted" });
  } catch (error) {
    res.status(404).send({ message: "is not deleted" });
  }
});

module.exports = {
  router,
  getNearestMaintenanceCenters,
};
*/