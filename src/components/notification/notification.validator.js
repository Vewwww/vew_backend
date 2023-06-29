const Joi = require('joi');
const AppError = require('../../utils/AppError');

const validation = Joi.object({
    toDay: Joi.date().required()
}).options({ allowUnknown: true });

getNotificationValidation = async (req, res, next) => {
  const obj = req.body;
  const { error } = validation.validate(obj);
  if (error) {
    return next(new AppError('invalid input', 400));
  }
  next();
};
module.exports = getNotificationValidation;
