
const serviceModel = require("./service.model");
const AppErr = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");




exports.createService = factory.createOne(serviceModel);

exports.getServices = factory.getAll(serviceModel);


exports.getService = factory.getOne(serviceModel);

exports.updateService = factory.updateOne(serviceModel);



exports.deleteService =  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedService = await serviceModel.findOneAndDelete({ _id: id });
  
    if (!deletedService) {
      return next(new AppError("No service found for this id", 404));
    }  
    res.status(204).send();
  });