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
const schedule = require("node-schedule");

exports.rate = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    let {rating} = req.body;
    // 1 find the document
    const document = await Model.findById(id);
    if (!document) {
      return next(new AppError(`No document found for this id ${id}`, 400));
    }

    console.log(document.rate,rating);
    // 2 update rates
    console.log(typeof document.rate,typeof rating);

    await Model.findByIdAndUpdate(id, { rate: (document.rate + rating) / 2 });


    res.status(204).send();
  });

exports.report = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const max_num_of_reports = 10;
    const { id } = req.params;

    // 1 find the document
    const document = await Model.findById(id);
    if (!document) {
      return next(new AppError(`No document found for this id ${id}`, 400));
    }
    // run schedule with cron job on document to run after after week if reports number is 0
    if (document.report.reportsNumber == 0) {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      const job = schedule.scheduleJob(date, async function () {
        // get docuemnt
        const document = await Model.findById(id);
        if (!document) {
          return next(new AppError(`No document found for this id ${id}`, 400));
        }

        // if document not susspended then reset reports number
        if (document.isSuspended === false)
          await Model.findByIdAndUpdate(id, {
            report: { reportsNumber: 0 },
          });
      });
    }

    console.log(document.report.reportsNumber);
    // 2 check the reposts number and update
    await Model.findByIdAndUpdate(id, {
      report: { reportsNumber: document.report.reportsNumber + 1 },
      isSuspended: document.report.reportsNumber >= max_num_of_reports - 1,
    });

    res.status(204).send();
  });

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
