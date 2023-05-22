const ServiceModel = require("./service.model");
const factory = require("../Handlers/handler.factory");

exports.createService = factory.createOne(ServiceModel);

exports.getServices = factory.getAll(ServiceModel);

exports.getService = factory.getOne(ServiceModel);

exports.updateService = factory.updateOne(ServiceModel);

exports.deleteService = factory.deleteOne(ServiceModel);
