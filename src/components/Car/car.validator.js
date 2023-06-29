const Joi = require('joi');
const AppError = require('../../utils/AppError');

const validation = Joi.object({
  carType: Joi.string().required(),
  carModel: Joi.string().required(),
  year: Joi.string().required().min(4).max(4),
  plateNumber: Joi.string().min(3).trim(true).required(),
  color: Joi.string().required(),
  owner: Joi.string().required(),
  carLicenseRenewalDate: Joi.date().required(),
  lastPeriodicMaintenanceDate: Joi.date().required(),
  averageMilesPerMonth: Joi.number().required().min(0).max(10000),
  milesLimit: Joi.number().required().min(0),
}).options({ allowUnknown: true });

carValidation = async (req, res, next) => {
  const obj = req.body;

  const { error } = validation.validate(obj);
  if (error) {
    console.log(error);
    return next(new AppError('invalid input', 406));
  }
  next();
};
module.exports = carValidation;
