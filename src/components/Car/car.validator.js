const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validation = Joi.object({
    carType: Joi.required(),
    carModel: Joi.required(),
    year: Joi.string().required(),
    plateNumber: Joi.string().alphanum().min(3).trim(true).required(),
});

carValidation = async (req, res, next) => {
	const obj = req.body;

    const { error } = validation.validate(obj);
	if (error) {
        console.log(error);
        return next(new AppError("no car found", 406));
    } 
    next();

};
module.exports = carValidation;