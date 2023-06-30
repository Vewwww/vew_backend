const { log } = require("util");
const factory = require("../Handlers/handler.factory");
const CarTypeModel = require("./carBrand.model");

exports.getCarTypes = factory.getAll(CarTypeModel);

exports.getCarType = factory.getOne(CarTypeModel);

exports.createCarType = factory.createOne(CarTypeModel);

exports.updateCarType = factory.deleteOne(CarTypeModel);

exports.deleteCarType = factory.deleteOne(CarTypeModel);

exports.sortCarType = factory.sortOne(CarTypeModel);
