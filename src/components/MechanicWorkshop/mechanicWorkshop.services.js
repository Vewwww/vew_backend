const express = require("express");
const MechanicModel = require("./mechanicWorkshop.model");
const factory = require("../Handlers/handler.factory");
const { getNearestPlaces } = require("../Handlers/getNearestPlaces");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
require("../location/location.model");

exports.signup = factory.signup(MechanicModel);
exports.emailVerify = factory.emailVerify(MechanicModel);
exports.authenticate=factory.authinticate()
exports.changePassword=factory.changePassword(MechanicModel)

exports.getNearestMechanicWorkshop = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  let filter = {}
  if(req.query.service){
    filter = {
        service: { $type: "array", $elemMatch: { $eq: req.query.service} },
      }
  }
  const manitenceCenters = await MechanicModel.find(filter)
    .populate({ path: "location", select: "latitude longitude -_id" })
    .populate("service");

  searchResult = getNearestPlaces(manitenceCenters, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});

