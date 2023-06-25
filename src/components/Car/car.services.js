
const carModel = require("./car.model");
const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory = require("../Handlers/handler.factory");


exports.createCar = factory.createOne(carModel);
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
})
exports.updateCar = factory.updateOne(carModel);
exports.deleteCar = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedCar = await carModel.findOneAndDelete({ _id: id });

  if (!deletedCar) {
    return next(new AppError("No car found for this id", 404));
  }
  res.status(204).send({ message: "deleted" });
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


