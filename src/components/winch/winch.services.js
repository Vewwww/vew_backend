const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const factory = require('../Handlers/handler.factory');
const AppError = require('../../utils/AppError');

const winchModel = require('./winch.model');
const carModel = require('../Car/car.model');
const { getNearestPlaces } = require('../Handlers/getNearestPlaces');
const io = require('socket.io-client');
const socket = io(`${process.env.BaseUrl}`);

socket.on('connect', () => {
  console.log('Connected to Socket.IO');
});

//rate
exports.rateWinch = factory.rate(winchModel);
//report
exports.reportWinch = factory.report(winchModel);

exports.getNearestWinch = catchAsyncErr(async (req, res) => {
  socket.emit('emit-upload-locations');
  setTimeout(() => {}, 3000);
  const { latitude, longitude } = req.body;
  const winches = await winchModel.find({ available: true }).select('-logedIn -emailConfirm -__v');

  searchResult = getNearestPlaces(winches, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});

exports.createWinch = catchAsyncErr(async (req, res) => {
  let car = null;
  if (req.body.car) {
    car = req.body.car;
    delete req.body.car;
  }
  const createdwinch = await winchModel.create(req.body);

  let carResult = {};
  if (car !== null) {
    car.owner = createdwinch._id;
    const createdCar = await carModel.create(car);
    carResult = createdCar;
  }

  res.status(200).json({ message: 'Verify your email' });
});

exports.updateWinchLocation = async (data) => {
  const winch = await winchModel.findByIdAndUpdate(
    { _id: data.id },
    {
      'location.latitude': data.latitude,
      'location.longitude': data.longitude,
    }
  );
};

exports.getWinches = catchAsyncErr(async (req, res, next) => {
  const winches = await winchModel.find();
  if (!winches) {
    return next(new AppError('no winch fount', 404));
  }

  res.status(200).json({
    status: 'success',
    results: winches.length,
    data: winches,
  });
});

exports.getWinch = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const winch = await winchModel.findById(id);
  if (!winch) {
    return next(new AppError('No winch found for this id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: winch,
  });
});
// update specific winch with id
exports.updateWinch = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const winch = req.body;
  const updatedWinch = await winchModel.findOneAndUpdate({ _id: id }, winch, {
    new: true,
  });
  if (!winch) {
    return next(new AppError('No winch found for this id', 404));
  }

  res.status(201).json({
    status: 'success',
    data: updatedWinch,
  });
});

// delete specific winch with id

exports.deleteWinch = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedWinch = await winchModel.findOneAndDelete({ _id: id });

  if (!deletedWinch) {
    return next(new AppError('No winch found for this id', 404));
  }

  res.status(204).send();
});
exports.updateWinchAvailableState = catchAsyncErr(async (req, res, next) => {
  const winch = await winchModel.findOneAndUpdate({ _id: req.user._id }, { available: req.body.available });

  if (!winch) {
    return next(new AppError('No winch found for this id', 404));
  }

  res.status(202).json({ message: `winch availability is : ${winch.available}` });
});

//   exports.getWinch = asyncHandler(async (req, res, next) => {
//     const { id } = req.params;

//     const _winch = await winch.findById(id);
//     if (!_winch) {
//       return next(new AppErr("No winch found for this id", 404));
//     }

//     res.status(200).json({
//       status: "success",
//       data: _winch,
//     });
//   });

// // update specific winch with id
//   exports.updateWinch = catchAsyncErr(async (req, res) => {
//     const { id } = req.params;
//     const  _winch  = req.body;
//     const updatedWinch = await winch.findOneAndUpdate({ _id: id }, _winch, {
//       new: true,
//     });

//     console.log(_winch);

//     if (!updatedWinch) {
//       return next(new AppErr("No winch found for this id", 404));
//     }

//     res.status(201).json({
//       status: "success",
//       data: updatedWinch,
//     });
//   });

// // delete specific winch with id

//   exports.deleteWinch = catchAsyncErr(async (req, res) => {
//     const { id } = req.params;
//     const deletedWinch = await winch.findOneAndDelete({ _id: id });

//     if (!deletedWinch) {
//       return next(new AppErr("No winch found for this id", 404));
//     }

//     res.status(204).send();
//   });
