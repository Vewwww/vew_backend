const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validation = Joi.object({
    ownerName: Joi.string().alphanum().min(3).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).trim(true).required(),
    mechanicPhone: Joi.string().length(11).pattern(/^01\d{9}$/).required(),
    name: Joi.string().alphanum().min(3).trim(true).required(),
    phoneNumber:  Joi.string().length(11).pattern(/^01\d{9}$/).required(),
    hasDelivery:Joi.boolean().required(),
});

mechanicValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError("no mechanic found", 406));
    } 

    next();
};
module.exports = mechanicValidation;