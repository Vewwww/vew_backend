const Joi = require('joi');
const AppError = require('../../utils/AppError');

const validation = Joi.object({
  name: Joi.string().min(3).max(15).trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  changedPasswordAt: Joi.date(),
  password: Joi.string().min(6).trim(true).required(),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^01\d{9}$/)
    .trim()
    .required(),
  gender: Joi.string().required().valid('male', 'female'),
  role: Joi.string().valid('admin', 'user').default('user'),
  cars: Joi.array()
    .items(
      Joi.object({
        carType: Joi.string().required(),
        color: Joi.string().required(),
        plateNumber: Joi.string().required(),
      })
    ),
  report: Joi.object({
    reportsNumber: Joi.number().default(0),
    dateReport: Joi.date(),
  }),
  driverLisenceRenewalDate: Joi.date(),
  isSuspended: Joi.boolean().default(false),
  emailConfirm: Joi.boolean().default(false),
  logedIn: Joi.boolean().default(false),
}).options({ allowUnknown: true });

const validateLocation = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
}).options({ allowUnknown: true });

const validateChangePassword = Joi.object({
  changedPasswordAt: Joi.date(),
  password: Joi.string().min(6).trim(true).required(),
})
exports.driverValidation = async (req, res, next) => {
    const obj = req.body;
    const { error } =  validation.validate(obj);
    if (error) {
      console.log(error);
      return next(new AppError(error.details[0].message, 400));
    }
    next();
  };
exports.ValidationPassword = async (req, res, next) => {
  const obj = req.body;
  const { error } = validateChangePassword.validate(obj);
  if (error) {
    console.log(error);
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

exports.validateLatandLon = async (req, res, next) => {
  const obj = req.body;
  const { error } = validateLocation.validate(obj);
  if (error) {
    console.log(error);
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};





const updateDriverValidation = Joi.object({
  name: Joi.string().min(3).max(15).trim(true),
  email: Joi.string().email().trim(true),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^01\d{9}$/)
    .trim(),
  gender: Joi.string().valid('male', 'female'),
  role: Joi.string().valid('admin', 'user').default('user'),
  
}).options({ allowUnknown: true });


exports.validateUpdateProfile = async (req, res, next) => {
  const obj = req.body;
  const { error } = updateDriverValidation.validate(obj);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};