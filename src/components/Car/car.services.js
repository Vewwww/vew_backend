const carModel = require('./car.model');
const AppError = require('../../utils/AppError');
const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const factory = require('../Handlers/handler.factory');
const {
  createCarLicenseNotification,
  createCarPeriodicDate,
  updateCarLicenseNotification,
  updateCarPeriodicDate,
} = require('../notification/notification.services');

exports.createCarForSignup = async (car, driverId) => {
  car.owner = driverId;

  if (car.carLicenseRenewalDate) {
    const notificationId =await createCarLicenseNotification(car.carLicenseRenewalDate, driverId);
    car.carLicenseRenewalNotifition = notificationId;
  }
  if (car.lastPeriodicMaintenanceDate && car.averageMilesPerMonth && car.milesLimit) {
    const notificationId =await createCarPeriodicDate(
      car.lastPeriodicMaintenanceDate && car.averageMilesPerMonth && car.milesLimit,
      driverId
    );
    car.periodicMaintenanceNotification = notificationId;
  }
  const createdCar = await carModel.create(car);
};

exports.createCar = catchAsyncErr(async (req, res, next) => {
  if (req.body.carLicenseRenewalDate) {
    const notificationId = await createCarLicenseNotification(req.body.carLicenseRenewalDate, req.body.owner);
    req.body.carLicenseRenewalNotifition = notificationId;
  }
  if (req.body.lastPeriodicMaintenanceDate && req.body.averageMilesPerMonth && req.body.milesLimit) {
    const notificationId = await createCarPeriodicDate(
      req.body.lastPeriodicMaintenanceDate && req.body.averageMilesPerMonth && req.body.milesLimit,
      req.body.owner
    );
    req.body.periodicMaintenanceNotification = notificationId;
  }

  const createdCar = await carModel.create(req.body);

  res.status(200).json({ data: createdCar });
});

exports.updateCar = catchAsyncErr(async (req, res, next) => {
  let car = await carModel.findById(req.params.id);
  if (!car) {
    return next(new AppError(`No car found for this id ${id}`, 400));
  }

  if (req.body.carLicenseRenewalDate) {
    if (car.carLicenseRenewalNotifition) {
      const notificationId = await updateCarLicenseNotification(
        req.body.carLicenseRenewalDate,
        car.carLicenseRenewalNotifition
      );
      req.body.carLicenseRenewalNotifition = notificationId;
    } else {
      const notificationId =await createCarLicenseNotification(req.body.carLicenseRenewalDate, car.owner);
      req.body.carLicenseRenewalNotifition = notificationId;
    }
  }

  if (req.body.lastPeriodicMaintenanceDate && req.body.averageMilesPerMonth && req.body.milesLimit) {
    if (car.periodicMaintenanceNotification) {
      const notificationId =await updateCarPeriodicDate(
        req.body.lastPeriodicMaintenanceDate && req.body.averageMilesPerMonth && req.body.milesLimit,
        car.periodicMaintenanceNotification
      );
      req.body.periodicMaintenanceNotification = notificationId;
    } else {
      const notificationId =await createCarLicenseNotification(
        req.body.lastPeriodicMaintenanceDate && req.body.averageMilesPerMonth && req.body.milesLimit,
        car.owner
      );
      req.body.periodicMaintenanceNotification = notificationId;
    }
  }

  const updatedCar = await carModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

  res.status(200).json({ data: updatedCar });
});

exports.getCars = factory.getAll(carModel);
exports.getCar = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const document = await carModel.findById(id);
  if (!document) {
    return next(new AppError(`No document found for this id ${id}`, 400));
  }
  res.status(200).json({
    data: document,
  });
});

exports.deleteCar = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedCar = await carModel.findOneAndDelete({ _id: id });

  if (!deletedCar) {
    return next(new AppError('No car found for this id', 404));
  }
  res.status(204).send({ message: 'deleted' });
});
exports.getCarsOfDriver = catchAsyncErr(async (req, res, next) => {
  const { driverId } = req.params;
  const car = await carModel.find({ owner: driverId });

  if (!car) {
    return next(new AppError(`No document found for this owner ${driverId}`, 400));
  } else {
    res.status(200).json(car);
  }
});
