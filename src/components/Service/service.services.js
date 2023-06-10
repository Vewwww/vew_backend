
const serviceModel = require("./service.model");
const AppErr = require("../../utils/AppErr");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const factory=require("../Handlers/handler.factory");




exports.createService = factory.createOne(ServiceModel);

exports.getServices = factory.getAll(ServiceModel);


exports.getService = factory.getOne(ServiceModel);

exports.updateService = factory.updateOne(ServiceModel);


