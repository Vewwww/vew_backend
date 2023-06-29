const Joi = require('joi');
const AppError = require('../../utils/AppError');

const loginValidationObject = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options({ allowUnknown: true });

exports.validateLogin = async (req, res, next) => {
  const obj = req.body;
  const { error } = loginValidationObject.validate(obj);
  if (error) {
    // console.log(error);
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};
