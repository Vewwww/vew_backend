const winchModel = require("./winch.model");
const AppErr = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");
require("../location/location.model");

//create new winch

 
exports.createWinch =factory.createService(winchModel);


//create new winch

exports.signup = factory.signup(winchModel);
exports.emailVerify = factory.emailVerify(winchModel);

exports.getNearestWinch = catchAsyncErr(async (req, res) => {
  const { latitude, longitude } = req.body;
  const manitenceCenters = await winchModel.find().populate({
    path: "location",
    select: "latitude longitude -_id",
  });


  searchResult = getNearestPlaces(manitenceCenters, latitude, longitude);
  res.status(200).json({ results: searchResult.length, data: searchResult });
});

// exports.createWinch = asyncHandler(async (req, res) => {
//    const _winch= req.body;
//     const createdwinch= await winch.create(_winch);


  exports.getWinches = catchAsyncErr(async (req, res, next) => {
    const winches = await winchModel.find();
    if (!winches) { return next(new AppError("no winch fount", 404)); }
  
    res.status(200).json({
      status: "success",
      results: winches.length,
      data: winches,
    });
  });

//     res.status(200).json({
//       status: "success",
//       data: createdwinch,
//     });
//   });

//get all winches

// exports.getWinches = asyncHandler(async (req, res) => {
//   const winches = await winch.find();

//   res.status(200).json({
//     status: "success",
//     results: winches.length,
//     data: winches,
//   });
// });

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
//   exports.updateWinch = asyncHandler(async (req, res) => {
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

//   exports.deleteWinch = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const deletedWinch = await winch.findOneAndDelete({ _id: id });

//     if (!deletedWinch) {
//       return next(new AppErr("No winch found for this id", 404));
//     }

//     res.status(204).send();
//   });
