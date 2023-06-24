const questionModel = require("./question.model");
const AppError = require("../../../utils/AppError");
const { catchAsyncErr } = require("../../../utils/CatchAsyncErr");
const factory = require("../../Handlers/handler.factory");


exports.createQuestion = factory.createOne(questionModel);

exports.getQuestions = factory.getAll(questionModel);


exports.getQuestion = factory.getOne(questionModel);

exports.updateQuestion = factory.updateOne(questionModel);



exports.deleteQuestion = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedQuestion = await questionModel.findOneAndDelete({ _id: id });

    if (!deletedQuestion) {
        return next(new AppError("No question found for this id", 404));
    }
    res.status(204).send();
});