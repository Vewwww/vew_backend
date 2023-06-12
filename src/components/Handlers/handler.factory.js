const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const ApiFeatures = require("../../utils/ApiFeatures");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const driverModel = require("../driver/driver.model");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const gasStationModel = require("../GasStation/gasStation.model");
const maintenanceCenterModel = require("../MaintenanceCenter/maintenanceCenter.model");
const { getNearestPlaces } = require("./getNearestPlaces");
const winchModel = require("../winch/winch.model");
const { sendEmail } = require("./email.factory");


exports.deleteOne = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findOneAndDelete({ _id: id });
    if (!document) {
      return next(new AppError(`No document found for this id ${id}`, 400));
    }

    res.status(204).send();
  });

exports.updateOne = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new AppError(`No document found for this id: ${req.params.id}`, 400)
      );
    }

    res.status(200).json({
      data: document,
    });
  });

exports.createOne = (Model) =>
  catchAsyncErr(async (req, res) => {
    const document = await Model.create(req.body);

    res.status(200).json({
      data: document,
    });
  });

exports.getOne = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new AppError(`No document found for this id ${id}`, 400));
    }
    res.status(200).json({
      data: document,
    });
  });

exports.getAll = (Model) =>
  catchAsyncErr(async (req, res) => {
    console.log("got here");
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const documentsCounts = await Model.countDocuments();
    //Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .fields()
      .sort()
      .filter();

    const { mongooseQuery, paginationResult } = apiFeatures;

    const documents = await mongooseQuery;
    res.status(200).json({
      results: documents.length,
      data: documents,
    });
  });
