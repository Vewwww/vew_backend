const Joi = require('joi');
const AppError = require('../../utils/AppError');
const createWinchRequestValidator = Joi.object({
  driver: Joi.string().required(),
  winch: Joi.string().required(),
  car: Joi.string().required(),
  location: Joi.object({
    road: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
});

exports.validateCreateWinchRequest = async (req, res, next) => {
  const obj = req.body;
  const { error } = createWinchRequestValidator.validate(obj);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

const createMechanicRequestValidator = Joi.object({
  service: Joi.string().required(),
  driver: Joi.string().required(),
  mechanic: Joi.string().required(),
  car: Joi.string().required(),
  location: Joi.object({
    road: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
});

exports.validateCreateMechanicRequest = async (req, res, next) => {
  const obj = req.body;
  const { error } = createMechanicRequestValidator.validate(obj);
  if (error) {
    
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};
