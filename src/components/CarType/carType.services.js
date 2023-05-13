const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const AppErr = require("../../utils/AppError");

const CarType = require("./carType.model");
//@desc   get list of carTypes
//@route  GET /api/v1/carType
//@access Public
exports.getCarTypes = catchAsyncErr(async (req, res) => {
  const carTypes = await CarType.find();

  res.status(200).json({
    status: "success",
    results: carTypes.length,
    data: carTypes,
  });
});

//@desc   get specific carTypes
//@route  GET /api/v1/carType
//@access Public
exports.getCarType = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;

  const carType = await CarType.findById(id);
  if (!carType) {
    return next(new AppErr("No carType found for this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: carType,
  });
});

//@desc   create carType
//@route  POST /api/v1/carType
//@access Private
exports.createCarType = catchAsyncErr(async (req, res) => {
  const { carType } = req.body;
  const createdCarType = await CarType.create(carType);

  res.status(200).json({
    status: "success",
    data: carType,
  });
});

//@desc   upadte carType
//@route  PUT /api/v1/carType
//@access Private
exports.updateCarType = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const { carType } = req.body;
  const updatedCarType = await CarType.findOneAndUpdate({ _id: id }, carType, {
    new: true,
  });

  if (!updatedCarType) {
    return next(new AppErr("No carType found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: createdCarType,
  });
});

//@desc   upadte carType
//@route  PUT /api/v1/carType
//@access Private
exports.deleteCarType = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const deletedCarType = await CarType.findOneAndDelete({ _id: id });

  if (!updatedCarType) {
    return next(new AppErr("No carType found for this id", 404));
  }

  res.status(204).send();
});
