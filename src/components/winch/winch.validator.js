const Joi = require('joi');
const AppError = require('../../utils/AppError');

const validation = Joi.object({
  name: Joi.string().min(3).trim(true).allow(" ,.'").required(),
  email: Joi.string().email().trim(true).required(),
  password: Joi.string().min(6).trim(true).required(),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^01\d{9}$/)
    .required(),
  car: Joi.object({
    carType: Joi.string().required(),
    color: Joi.string().required(),
    plateNumber: Joi.string().required(),
  }).required(),
  report: Joi.number().default(0),
  dateReport: Joi.date(),
  rate: Joi.number().default(4.5),
  isSuspended: Joi.boolean(),
  emailConfirm: Joi.boolean(),
  location: Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number(),
  }),
  logedIn: Joi.boolean().default(false),
  role: Joi.string().default('winch'),
}).options({ allowUnknown: true });

exports.winchValidation = async (req, res, next) => {
  const obj = req.body;

  const { error } = validation.validate(obj);
  if (error) {
    // console.log(error);
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
    // console.log(error);
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};
