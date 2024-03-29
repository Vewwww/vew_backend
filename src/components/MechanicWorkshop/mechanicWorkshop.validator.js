const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validation = Joi.object({
  ownerName: Joi.string().min(3).trim(true).allow(' ,.\'').required(),
  email: Joi.string().email().trim(true).required(),
  password: Joi.string().min(6).trim(true).required(),
  mechanicPhone: Joi.string()
    .length(11)
    .pattern(/^01\d{9}$/)
    .required(),
  name: Joi.string().min(3).trim(true).allow(' ,.\'').required(),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^01\d{9}$/)
    .required(),
  hasDelivery: Joi.boolean().required(),
  service: Joi.array().items(Joi.string()),
  report: Joi.object({
    reportsNumber: Joi.number().default(0),
    dateReport: Joi.date(),
  }),
  rate: Joi.number().default(0),
  isSuspended: Joi.boolean().default(false),
  emailConfirm: Joi.boolean().default(false),
  logedIn: Joi.boolean().default(false),
  location:Joi.object({
    description: {
      ar:Joi.string() ,
      en:Joi.string() ,
    },
    latitude: Joi.number().required(),
  longitude: Joi.number().required()
  })
}).options({ allowUnknown: true });

exports.mechanicValidation = async (req, res, next) => {
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