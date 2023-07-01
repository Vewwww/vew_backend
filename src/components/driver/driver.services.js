const driverModel = require('./driver.model');
const AppError = require('../../utils/AppError');
const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../Handlers/email.factory');
const carModel = require('../Car/car.model');
const factory = require('../Handlers/handler.factory');
const {
  createDriverLicenseNotification,
  updateDriverLicenseNotification,
} = require('../notification/notification.services');

const mechanicWorkshopModel = require('../MechanicWorkshop/mechanicWorkshop.model');
const maintenanceCenterModel = require('../MaintenanceCenter/maintenanceCenter.model');
const gasStationModel = require('../GasStation/gasStation.model');
const winchModel = require('../winch/winch.model');
const { getNearestPlaces } = require('../Handlers/getNearestPlaces');
const { createCarForSignup } = require('../Car/car.services');

exports.reportDriver = factory.report(driverModel);

exports.createUser = catchAsyncErr(async (req, res, next) => {
  // let car = {};
  // if (req.body.car) {
  //   car = req.body.car;
  //   delete req.body.car;
  // }

  let user = new driverModel(req.body);
  await user.save();

  if (req.body.driverLisenceRenewalDate) {
    const notificationId = await createDriverLicenseNotification(req.body.driverLisenceRenewalDate, user._id);
    user.driverLisenceRenewalNotification = notificationId;
    user.save();
  }

  if (req.body.car) {
    await createCarForSignup(req.body.car, user._id);
  }

  res.status(200).json({ message: 'Verify your email' });
});

// to update specific User
exports.updateUser = catchAsyncErr(async (req, res, next) => {
  let user = req.user;

  if (req.body.email) {
    email = req.body.email;
    let isUser = await driverModel.findOne({ email });
    if (!isUser) {
      isUser = await mechanicWorkshopModel.findOne({ email });
      if (!isUser) {
        isUser = await winchModel.findOne({ email });
      }
    }
    if (isUser) return next(new AppError('user with thes email already exists, please change your email', 401));
    let token = jwt.sign({ email }, process.env.EMAIL_JWT_KEY);
    user.emailConfirm = false;
    user.save();
    await sendEmail({ email, token, message: 'please verify you are the owner of this email' }, driverModel);
  }

  if (req.body.driverLisenceRenewalDate) {
    if (user.driverLisenceRenewalNotification) {
      const notificationId = await updateDriverLicenseNotification(
        req.body.driverLisenceRenewalDate,
        user.driverLisenceRenewalNotification
      );
    } else {
      const notificationId = await createDriverLicenseNotification(req.body.driverLisenceRenewalDate, req.user._id);
      req.body.driverLisenceRenewalNotification = notificationId;
    }
  }

  user = await driverModel.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });

  res.status(200).json({ data: user });
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
    name_query.available = true;
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
  const winches = await winchModel.find({ available: true });

  let searchResult = [];
  if (workshops) searchResult.push(...workshops);
  if (maintenceCenters) searchResult.push(...maintenceCenters);
  if (gasStations) searchResult.push(...gasStations);
  if (winches) searchResult.push(...winches);

  searchResult = getNearestPlaces(searchResult, latitude, longitude);

  res.status(200).json({ results: searchResult.length, data: searchResult });
});

exports.getDrivers = catchAsyncErr(async (req, res) => {
  let Users = await driverModel.find({ role: 'user' });
  res.status(200).json({ Users });
});

exports.getProfile = catchAsyncErr(async (req, res) => {
  const cars = await carModel
    .find({ owner: req.user._id })
    .select(
      '-averageMilesPerMonth -lastPeriodicMaintenanceDate -carLicenseRenewalNotifition -periodicMaintenanceNotification -owner -__v'
    )
    .populate({ path: 'carModel', select: '-__v -brand' })
    .populate({ path: 'carType', select: '-__v' })
    .populate({ path: 'color', select: '-__v' });

  const user = await driverModel
    .findOne({ _id: req.user._id })
    .select(
      '-report -__v -isSuspended -password -emailConfirm -logedIn -passwordReset -lisenceRenewalDate -driverLisenceRenewalNotification'
    );

  res.status(200).json({ data: { user, cars } });
});
