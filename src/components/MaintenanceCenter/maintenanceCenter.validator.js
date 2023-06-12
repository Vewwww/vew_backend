const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validation = Joi.object({
    name: {
        ar: Joi.string().alphanum().min(3).trim(true).required(),
        en: Joi.string().alphanum().min(3).trim(true).required(),
      },
      phoneNumber:Joi.string().required(),
      carType:Joi.array().items(Joi.string()),
      isVerified: Joi.boolean(),
      rate:Joi.number(),
});

maintenanceValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError(error.details[0].message, 400));
    } 
    next();

};
module.exports = maintenanceValidation;