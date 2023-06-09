const factory = require("../Handlers/handler.factory");
const ColorModel = require("./color.model");

exports.getColors = factory.getAll(ColorModel);

exports.getColor = factory.getOne(ColorModel);

exports.createColor = factory.createOne(ColorModel);

exports.updateColor = factory.deleteOne(ColorModel);

exports.deleteColor = factory.deleteOne(ColorModel);
