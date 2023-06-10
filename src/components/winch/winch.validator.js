const Joi = require("joi");
const AppError = require("../utils/AppErr");

const validation = Joi.object({
    ownerName: Joi.string().alphanum().min(3).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).trim(true).required(),
    phoneNumber:  Joi.string().length(10).pattern(/^01\d{9}$/).required(),
    plateNumber: Joi.string().alphanum().min(3).trim(true).required(),
});

winchValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError("no winch found", 406));
    } 
};
module.exports = winchValidation;