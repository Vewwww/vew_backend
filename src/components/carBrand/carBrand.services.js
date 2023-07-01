const { log } = require("util");
const factory = require("../Handlers/handler.factory");
const CarTypeModel = require("./carBrand.model");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr")
exports.getCarTypes = factory.getAll(CarTypeModel);

exports.getCarType = factory.getOne(CarTypeModel);

exports.createCarType = factory.createOne(CarTypeModel);

exports.updateCarType = factory.deleteOne(CarTypeModel);

exports.deleteCarType = factory.deleteOne(CarTypeModel);

exports.sortCarType = catchAsyncErr(async (req, res, next) => {
    const lang = req.query.lang;
    if (lang == "ar") {
        //console.log("========");
        var document = await CarTypeModel.find().sort("name.ar");
    } else {
        var document = await CarTypeModel.find().sort("name.en");
    }

    if (!document) {
        return next(new AppError(`No document found`, 400));
    }
    res.status(200).json({
        data: document,
    });
});