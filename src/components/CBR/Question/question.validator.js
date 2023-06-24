const Joi = require("joi");
const AppError = require("../../../utils/AppError");

const validation = Joi.object({
    carTyquestionpe: Joi.string().trim().required(),
    choices: Joi.array().items(
        Joi.object({
            choice: Joi.string().trim().required(),
            keywords: Joi.array().items(Joi.string()).required()
        })
    ).required()
}).options({ allowUnknown: true });

questionValidation = async (req, res, next) => {
    const obj = req.body;

    const { error } = validation.validate(obj);
    if (error) {
        console.log(error);
        return next(new AppError(error.details[0].message, 400));
    }
    next();

};
module.exports = questionValidation;