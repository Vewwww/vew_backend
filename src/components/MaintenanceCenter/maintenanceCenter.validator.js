const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validation = Joi.object({
    name: {
        ar: Joi.string().alphanum().min(3).trim(true).required(),
        en: Joi.string().alphanum().min(3).trim(true).required(),
      },
      carType: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
      location: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      isVerified: Joi.boolean(),
});

maintenanceValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError("no maintenanceCenter found", 406));
    } 
};
module.exports = maintenanceValidation;