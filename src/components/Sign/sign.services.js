const signModel = require("./sign.model");
const factory=require("../Handlers/handler.factory");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");

exports.createSign = catchAsyncErr(async (req, res) => {
    req.body.image=req.file.filename
    let sign = new signModel(req.body)
    await sign.save()
    res.status(200).json(sign)
  });

exports.getSigns = factory.getAll(signModel);

exports.getSign = factory.getOne(signModel);

// exports.updateSign = factory.updateOne(signModel);





