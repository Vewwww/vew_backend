const mechanicModel = require("./mechanicWorkshop.api");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");
//create new service

exports.createMechanicWorkshop = factory.createService(mechanicModel);


//get all mechanic

exports.getMechanicWorkshops = catchAsyncErr(async (req, res, next) => {
  const mechanics = await mechanicModel.find();
  if (!mechanics) { return next(new AppError("no mechanic found", 404)); }

  res.status(200).json({
    status: "success",
    results: mechanics.length,
    data: mechanics,
  });
});






//get specific mechanic with id

exports.getMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const mechanic = await mechanicModel.findById(id);
  if (!mechanic) {
    return next(new AppError("No mechanic found for this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: mechanic,
  });
});



// update specific mechanic with id
exports.updateMechanicWorkshop = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const mechanic = req.body;
  const updatedMechanic = await mechanicModel.findOneAndUpdate({ _id: id }, mechanic, {
    new: true,
  });
  if (!mechanic) {
    return next(new AppError("No mechanic found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedMechanic,
  });
});







// delete specific mechanic with id

exports.deleteMechanicWorkshop =  catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const deletedMechanic = await mechanicModel.findOneAndDelete({ _id: id });

  if (!deletedMechanic) {
    return next(new AppError("No mechanic found for this id", 404));
  }

  res.status(204).send();
});


