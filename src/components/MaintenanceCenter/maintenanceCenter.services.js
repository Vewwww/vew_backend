const maintenanceCenterModel = require("./maintenanceCenter.model");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");
//create new service

exports.createMaintenanceCenter = factory.createService(maintenanceCenterModel);


//get all maintenance center

exports.getMaintenanceCenters = catchAsyncErr(async (req, res, next) => {
  const maintenanceCenters = await maintenanceCenterModel.find();
  if (!maintenanceCenters) { return next(new AppError("no maintenance center fount", 404)); }

  res.status(200).json({
    status: "success",
    results: maintenanceCenters.length,
    data: maintenanceCenters,
  });
});






//get specific maintenance center with id

exports.getMaintenanceCenter = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const maintenanceCenter = await maintenanceCenterModel.findById(id);
  if (!maintenanceCenter) {
    return next(new AppError("No maintenance center found for this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: maintenanceCenter,
  });
});



// update specific maintenance center with id
exports.updateMaintenanceCenter = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const maintenanceCenter = req.body;
  const updatedMaintenanceCenter = await maintenanceCenterModel.findOneAndUpdate({ _id: id }, maintenanceCenter, {
    new: true,
  });
  if (!maintenanceCenter) {
    return next(new AppError("No maintenance center found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedMaintenanceCenter,
  });
});







// delete specific maintenance center with id

exports.deleteMaintenanceCenter =  catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedMaintenanceCenter = await maintenanceCenterModel.findOneAndDelete({ _id: id });

  if (!deletedMaintenanceCenter) {
    return next(new AppError("No maintenance center found for this id", 404));
  }

  res.status(204).send();
});


