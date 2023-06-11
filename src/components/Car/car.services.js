
const carModel = require("./car.model");
const AppErr = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");




exports.createCar = factory.createOne(carModel);

exports.getCars = factory.getAll(carModel);


exports.getCar = factory.getOne(carModel);

exports.updateCar = factory.updateOne(carModel);



exports.deleteCar =  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedCar = await carModel.findOneAndDelete({ _id: id });
  
    if (!deletedCar) {
      return next(new AppError("No car found for this id", 404));
    }  
    res.status(204).send();
  });