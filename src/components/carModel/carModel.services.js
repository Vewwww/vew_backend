const AppError = require("../../utils/AppError");
const modelsModel = require("./carModel.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");

exports.sortCarModel = factory.sortOne(modelsModel);

exports.createModel = factory.createOne(modelsModel)

exports.getModels = factory.getAll(modelsModel);
exports.getModel = factory.getOne(modelsModel);

exports.getModelOfBrand = catchAsyncErr(async (req, res, next) => {
  const { brandId } = req.params;
  const document = await modelsModel.find({ brand: brandId });
  if (!document) {
    return next(new AppError(`No document found for this id ${id}`, 400));
  }
  res.status(200).json({
    data: document,
  });
});