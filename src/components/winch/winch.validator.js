const Joi = require("joi");
const AppError = require("../utils/AppErr");

const validation = Joi.object({
    name: Joi.string().min(3).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).trim(true).required(),
    phoneNumber:  Joi.string().length(11).pattern(/^01\d{9}$/).required(),
});

winchValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError(error.details[0].message, 400));
    } 
};
module.exports = winchValidation;