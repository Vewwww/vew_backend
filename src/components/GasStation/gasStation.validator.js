const Joi = require('joi');
const AppError = require('../../utils/AppError');

const validateLocation = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
}).options({ allowUnknown: true });

exports.validateLatandLon = async (req, res, next) => {
  const obj = req.body;
  const { error } = validateLocation.validate(obj);
  if (error) {
    console.log(error);
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};
