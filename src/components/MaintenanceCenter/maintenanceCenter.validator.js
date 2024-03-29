const Joi = require('joi');
const AppError = require('../../utils/AppError');

const validation = Joi.object({
  name: {
    ar: Joi.string().min(3).trim(true).allow(" ,.'").required(),
    en: Joi.string().min(3).trim(true).allow(" ,.'").required(),
  },
  phoneNumber: Joi.string().required(),
  carType: Joi.array().items(Joi.string()),
  isVerified: Joi.boolean(),
  rate: Joi.number(),
}).options({ allowUnknown: true });

exports.maintenanceValidation = async (req, res, next) => {
  const obj = req.body;

  const { error } = validation.validate(obj);
  if (error) {
    console.log(error);
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

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
