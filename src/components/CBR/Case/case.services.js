const caseModel = require("./case.model");
const AppError = require("../../../utils/AppError");
const { catchAsyncErr } = require("../../../utils/CatchAsyncErr");
const factory = require("../../Handlers/handler.factory");

const CBR = require("./cbr");

exports.createCase = factory.createOne(caseModel);

exports.getCases = factory.getAll(caseModel);


exports.getCase = factory.getOne(caseModel);

exports.updateCase = factory.updateOne(caseModel);



exports.deleteCase = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const deletedCase = await caseModel.findOneAndDelete({ _id: id });

    if (!deletedCase) {
        return next(new AppError("No case found for this id", 404));
    }
    res.status(204).send();
});

//====================================================


exports.findSolution = catchAsyncErr
    (async (req, res, next) => {
        const cases = await caseModel.find().populate("serviceId")
        const query = req.body.query;//arr of string
        const cbr = new CBR(cases);
        const sol = cbr.solve(query);
        res.status(200).send(sol);
    });