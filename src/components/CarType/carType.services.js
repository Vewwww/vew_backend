const factory = require("../Handlers/handler.factory");
const CarTypeModel = require("./carType.model");

exports.getCarTypes = factory.getAll(CarTypeModel);

exports.getCarType = factory.getOne(CarTypeModel);

exports.createCarType = factory.createOne(CarTypeModel);

exports.updateCarType = factory.deleteOne(CarTypeModel);

exports.deleteCarType = factory.deleteOne(CarTypeModel);
