const Joi = require("joi");
const AppError = require("../../../utils/AppError");

const validation = Joi.object({
    caseKeyWords: Joi.array().items(Joi.string()).required(),
    solution: Joi.string().trim().required(),
    serviceId: Joi.string()
}).options({ allowUnknown: true });

caseValidation = async (req, res, next) => {
    const obj = req.body;

    const { error } = validation.validate(obj);
    if (error) {
        console.log(error);
        return next(new AppError(error.details[0].message, 400));
    }
    next();

};
module.exports = caseValidation;