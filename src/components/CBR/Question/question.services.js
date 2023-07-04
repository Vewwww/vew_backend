const questionModel = require("./question.model");
const AppError = require("../../../utils/AppError");
const { catchAsyncErr } = require("../../../utils/CatchAsyncErr");
const factory = require("../../Handlers/handler.factory");


exports.createQuestion = factory.createOne(questionModel);

exports.getQuestions = factory.getAll(questionModel);


exports.getQuestion = factory.getOne(questionModel);

exports.updateQuestion = factory.updateOne(questionModel);

exports.getAllCategories = catchAsyncErr(async (req, res, next) => {
    const categories = await questionModel.distinct("category");

    console.log(categories);
    if (!categories) {
        return next(new AppError("No categories found", 404));
    }
    res.status(200).json({
        data: categories
    });
});


exports.getQuestionsByCategory = catchAsyncErr(async (req, res, next) => {
    const { category } = req.params;

    const questions = await questionModel.find({ category }).select("questions");

    console.log(questions);
    if (questions.length == 0) {
        return next(new AppError(`No question found for "${category}"`, 404));
    }
    res.status(200).json({
        data: questions
    });
});


exports.deleteQuestion = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedQuestion = await questionModel.findOneAndDelete({ _id: id });

    if (!deletedQuestion) {
        return next(new AppError("No question found for this id", 404));
    }
    res.status(204).send();
});