const {} = require("../../utils/CatchAsyncErr");
const RequestModel = require("./request.model");
const MechanistModel = require("./request.model");
const AppErr = require("../../utils/AppError");
const factory = require("../Handlers/handler.factory");

exports.createfilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.mechnistId) {
    filterObject = { mechanist: req.params.mechnistId };
  }
  if (req.params.winchId) {
    filterObject = { winch: req.params.winchId };
  }
  req.filterObject = filterObject;
  next();
};

//create new request
exports.createRequest = factory.createOne(RequestModel);

//isactive false | accepted false      || pending request [user]  || upcoming request [mechanic]
//isActive true  | accepted true       || current request [user]  || Accepted request
//isactive false | accepted true       || previos request [user]  ||

//protectedRoute
exports.getDriverPendingRequests = catchAsyncErr(async (req, res, next) => {
  const upcomingRequests = await RequestModel.findOne({
    isActive: false,
    accepted: false,
    mechanist: req.user._id,
  });
  res.statu(200).json({ data: upcomingRequests });
});

//protectedRoute
exports.getMechanistUpcomingRequests = catchAsyncErr(async (req, res, next) => {
  const upcomingRequests = await RequestModel.findOne({
    isActive: false,
    accepted: false,
    mechanist: req.user._id,
  });
  res.statu(200).json({ data: upcomingRequests });
});

exports.getMechanistAcceptedRequests = catchAsyncErr(async (req, res, next) => {
  const acceptedRequests = await RequestModel.findOne({
    isActive: true,
    accepted: true,
    mechanist: req.user._id,
  });
  res.statu(200).json({ data: acceptedRequests });
});

//get specific request with id

exports.getRequest = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;

  const _request = await request.findById(id);
  if (!_request) {
    return next(new AppErr("No request found for this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: _request,
  });
});

// update specific request with id
exports.updateRequest = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const _request = req.body;
  const updatedRequest = await request.findOneAndUpdate({ _id: id }, _request, {
    new: true,
  });

  if (!updatedRequest) {
    return next(new AppErr("No request found for this id", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedRequest,
  });
});

// delete specific request with id

exports.deleteRequest = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const deletedRequest = await request.findOneAndDelete({ _id: id });

  if (!deletedRequest) {
    return next(new AppErr("No request found for this id", 404));
  }

  res.status(204).send();
});
