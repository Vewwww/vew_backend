const winchModel = require("./winch.model");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");
//create new winch

 
exports.createWinch =factory.createService(winchModel);


//get all winches

  exports.getWinches = catchAsyncErr(async (req, res, next) => {
    const winches = await winchModel.find();
    if (!winches) { return next(new AppError("no winch fount", 404)); }
  
    res.status(200).json({
      status: "success",
      results: winches.length,
      data: winches,
    });
  });


//get specific winch with id

  exports.getWinch = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const winch = await winchModel.findById(id);
    if (!winch) {
      return next(new AppError("No winch found for this id", 404));
    }
    res.status(200).json({
      status: "success",
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
      return next(new AppError("No winch found for this id", 404));
    }
  
    res.status(201).json({
      status: "success",
      data: updatedWinch,
    });
  });

// delete specific winch with id

  exports.deleteWinch = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedWinch = await winchModel.findOneAndDelete({ _id: id });
  
    if (!deletedWinch) {
      return next(new AppError("No winch found for this id", 404));
    }
  
    res.status(204).send();
  });