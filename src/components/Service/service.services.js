const serviceModel = require("./service.model");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");
//create new service

exports.createService = factory.createService(serviceModel);


//get all service

exports.getServices = catchAsyncErr(async (req, res, next) => {
  const services = await serviceModel.find();
  if (!services) { return next(new AppError("no services fount", 404)); }

  res.status(200).json({
    status: "success",
    results: services.length,
    data: services,
  });
});






//get specific service with id

exports.getService = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const service = await serviceModel.findById(id);
  if (!service) {
    return next(new AppError("No service found for this id", 400));
  }
  res.status(200).json({
    status: "success",
    data: service,
  });
});



// update specific service with id
exports.updateService = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const service = req.body;
  const updatedService = await serviceModel.findOneAndUpdate({ _id: id }, service, {
    new: true,
  });
  if (!service) {
    return next(new AppError("No service found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedService,
  });
});







// delete specific service with id

exports.deleteService =  catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedService = await serviceModel.findOneAndDelete({ _id: id });

  if (!deletedService) {
    return next(new AppError("No service found for this id", 404));
  }

  res.status(204).send();
});


