const Joi = require("joi");
const AppError = require("../../../utils/AppError");

const validation = Joi.object({
    category: Joi.string().trim().required(),
    questions: Joi.array().items(
        Joi.object({
            subQuestion: Joi.string().trim().required(),
            yesKeywords: Joi.array().items(Joi.string()).required(),
            noKeywords: Joi.array().items(Joi.string()).required()

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