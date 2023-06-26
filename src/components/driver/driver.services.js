const driverModel = require('./driver.model');
const AppError = require('../../utils/AppError');
const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const carModel = require('../Car/car.model');
const factory = require('../Handlers/handler.factory');
const createNotification = require('../notification/notification.services');

const mechanicWorkshopModel = require('../MechanicWorkshop/mechanicWorkshop.model');
const maintenanceCenterModel = require('../MaintenanceCenter/maintenanceCenter.model');
const gasStationModel = require('../GasStation/gasStation.model');
const winchModel = require('../winch/winch.model');
const { getNearestPlaces } = require('../Handlers/getNearestPlaces');

//report
exports.reportDriver = factory.report(driverModel);
// to add new user
exports.createUser = catchAsyncErr(async (req, res, next) => {
  let cars = [];
  if (req.body.cars) {
    cars = req.body.cars;
    delete req.body.cars;
  }
  let user = new driverModel(req.body);
  await user.save();
  createNotification(driverLisenceRenewalDate, CarLicenseRenewalDate, lastPeriodicMaintenanceDate, _id);
  let carsResult = [];
  if (cars.length) {
    for (const car of cars) {
      car.owner = user._id;
      const createdCar = new carModel(car);
      createdCar.save();
      carsResult.push(createdCar);
    }
  }
  res.status(200).json({ message: 'Verify your email' });
});

// to update specific User
exports.updateUser = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  let User = await driverModel.findByIdAndUpdate(id, req.body, { new: true });

  !User && next(new AppError('User not found', 400));
  User && res.status(200).json(User);
});
//search
exports.search = catchAsyncErr(async (req, res, next) => {
  const { keyword } = req.query;
  const { latitude, longitude } = req.body;

  const ar_en_ = {
    $or: [
      { 'name.ar': { $regex: '.*' + keyword + '.*', $options: 'i' } },
      { 'name.en': { $regex: '.*' + keyword + '.*', $options: 'i' } },
    ],
  };

  const name_query = {
    name: { $regex: '.*' + keyword + '.*', $options: 'i' },
  };

  if (keyword) {
    const workshops = await mechanicWorkshopModel
      .find(name_query)
      .populate({ path: 'location', select: 'latitude longitude -_id' });
    const maintenceCenters = await maintenanceCenterModel.find(ar_en_name_query);
    const gasStations = await gasStationModel.find(name_query);
    const winches = await winchModel.find(name_query);

    let searchResult = [];
    if (workshops) searchResult.push(...workshops);
    if (maintenceCenters) searchResult.push(...maintenceCenters);
    if (gasStations) searchResult.push(...gasStations);
    if (winches) searchResult.push(...winches);

    searchResult = getNearestPlaces(searchResult, latitude, longitude);

    res.status(200).json({ results: searchResult.length, data: searchResult });
  } else {
    return next(AppError('No search keyword is provided', 400));
  }
});

exports.search = catchAsyncErr(async (req, res, next) => {
  const { keyword } = req.query;
  const { latitude, longitude } = req.body;

  const ar_en_name_query = {
    $or: [
      { 'name.ar': { $regex: '.*' + keyword + '.*', $options: 'i' } },
      { 'name.en': { $regex: '.*' + keyword + '.*', $options: 'i' } },
    ],
  };

  const name_query = {
    name: { $regex: '.*' + keyword + '.*', $options: 'i' },
  };

  if (keyword) {
    const workshops = await mechanicWorkshopModel
      .find(name_query)
      .populate({ path: 'location', select: 'latitude longitude -_id' });
    const maintenceCenters = await maintenanceCenterModel.find(ar_en_name_query);
    const gasStations = await gasStationModel.find(name_query);
    name_query.available=true;
    const winches = await winchModel.find(name_query);

    let searchResult = [];
    if (workshops) searchResult.push(...workshops);
    if (maintenceCenters) searchResult.push(...maintenceCenters);
    if (gasStations) searchResult.push(...gasStations);
    if (winches) searchResult.push(...winches);

    searchResult = getNearestPlaces(searchResult, latitude, longitude);

    res.status(200).json({ results: searchResult.length, data: searchResult });
  } else {
    return next(AppError('No search keyword is provided', 400));
  }
});

exports.getNearest = catchAsyncErr(async (req, res, next) => {
  const { latitude, longitude } = req.body;
  const workshops = await mechanicWorkshopModel.find();
  const maintenceCenters = await maintenanceCenterModel.find();
  const gasStations = await gasStationModel.find();
  const winches = await winchModel.find({available:true});

  let searchResult = [];
  if (workshops) searchResult.push(...workshops);
  if (maintenceCenters) searchResult.push(...maintenceCenters);
  if (gasStations) searchResult.push(...gasStations);
  if (winches) searchResult.push(...winches);

  searchResult = getNearestPlaces(searchResult, latitude, longitude);

  res.status(200).json({ results: searchResult.length, data: searchResult });
});

exports.getDrivers = catchAsyncErr(async (req, res) => {
  let Users = await driverModel.find({role:"user"});
  res.status(200).json({ Users});
});
