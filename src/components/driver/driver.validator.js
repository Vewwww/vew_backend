const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validation = Joi.object({
    name: Joi.string().alphanum().min(3).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).trim(true).required(),
    phoneNumber:  Joi.string().length(10).pattern(/^01\d{9}$/).required(),
    gender:Joi.string().required().valid('male','female'),
    role:Joi.string().valid('admin','user').default('user'),
    lisenceRenewalDate:Joi.date(),
});

driverValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError("no user found", 406));
    } 
};
module.exports = driverValidation;