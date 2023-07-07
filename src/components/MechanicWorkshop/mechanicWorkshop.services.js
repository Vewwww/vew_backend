const mechanicModel = require('./mechanicWorkshop.model');
const LocationModel = require('../location/location.model');

const AppError = require('../../utils/AppError');
const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const { getNearestPlaces } = require('../Handlers/getNearestPlaces');
const factory = require('../Handlers/handler.factory');
const winchModel = require('../winch/winch.model');
const driverModel = require('../driver/driver.model');
//rate
exports.rateMechanic = factory.rate(mechanicModel);

//report
exports.reportMechanic = factory.report(mechanicModel);

//create new service
exports.createMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const mechanic = await mechanicModel.create(req.body);

  res.status(200).json({ message: 'Verify your email' });
});

exports.getNearestMechanicWorkshop = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  let filter = {};
  if (req.query.service) {
    filter = {
      service: { $type: 'array', $elemMatch: { $eq: req.query.service } },
    };
  }
  const manitenceCenters = await mechanicModel.find(filter).select('-logedIn -emailConfirm -__v').populate('service');

  searchResult = getNearestPlaces(manitenceCenters, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});

//get all mechanic
exports.getMechanicWorkshops = catchAsyncErr(async (req, res, next) => {
  const mechanics = await mechanicModel.find({emailConfirm:true});
  if (!mechanics) {
    return next(new AppError('no mechanic found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: mechanics.length,
    data: mechanics,
  });
});

//get specific mechanic with id

exports.getMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const id = req.user._id;
  console.log('req.user');
  const mechanic = await mechanicModel.findOne({ _id: id }).populate("service");
  if (!mechanic) {
    return next(new AppError('No mechanic found for this id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: mechanic,
  });
});


exports.updateProfile = factory.updateProfile(mechanicModel)

// delete specific mechanic with id
exports.deleteMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedMechanic = await mechanicModel.findOneAndDelete({ _id: id });

  if (!deletedMechanic) {
    return next(new AppError('No mechanic found for this id', 404));
  }

  res.status(204).send();
});
