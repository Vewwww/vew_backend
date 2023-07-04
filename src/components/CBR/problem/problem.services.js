const problemModel = require("./problem.model");
const AppError = require("../../../utils/AppError");
const { catchAsyncErr } = require("../../../utils/CatchAsyncErr");
const factory = require("../../Handlers/handler.factory");


exports.createProblem = factory.createOne(problemModel);

exports.getProblems = factory.getAll(problemModel);


exports.getProblem = factory.getOne(problemModel);

exports.updateProblem = factory.updateOne(problemModel);

exports.getUnsolved = catchAsyncErr(async (req, res, next) => {
    const unsolvedProblem = await problemModel.find({ isSolved: false });
    // console.log(unsolvedProblem);
    res.status(200).json({
        data: unsolvedProblem
    });
});

exports.deleteProblem = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedProblem = await problemModel.findOneAndDelete({ _id: id });

    if (!deletedProblem) {
        return next(new AppError("No Problem found for this id", 404));
    }
    res.status(204).send();
});