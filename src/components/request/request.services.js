const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const RequestModel = require("./request.model");
const MechanistModel = require("./request.model");
const AppErr = require("../../utils/AppError");
const { createChat } = require("../chat/chat.services");
const factory = require("../Handlers/handler.factory");
const { request } = require("express");

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

///////////////   MECHANIC    ////////////////////
exports.acceptMechanicRequest = catchAsyncErr(async (req, res, next) => {
  const {driverId}= req.body
  let request = RequestModel.findOne({
    driver: driverId,
    mechanic: req.user._id,
  })
    .populate({ path: "service" })
    .populate({ path: "driver" })
    .populate({ path: "car" })
    .populate({ path: "mechanic" });
  if (!request) {
    return next(
      new AppErr("No request found for this driver and mechanic", 404)
    );
  }

  reqest.isActive = true;
  request.accepted = true;
  await request.save();

  const chat = await createChat(driverId, req.user._id);
  if (!chat) {
    reqest.isActive = false;
    request.accepted = false;
    await request.save();
    return next(
      new AppErr(
        "Sorry, something went wrong, repeat this request again please",
        500
      )
    );
  }

  res.status(200).json({ data: request });
});

exports.getMechanicUpcomingRequests = catchAsyncErr(async (req, res, next) => {
  const newRequests = false;

  const upcomingRequests = await RequestModel.findOne({
    isActive: false,
    accepted: false,
    mechanic: req.user._id,
  })
    .populate({ path: "service" })
    .populate({ path: "driver" })
    .populate({ path: "car" })
    .populate({ path: "mechanic" });

  for (request of upcomingRequests) {
    if (request.isSeen === false) {
      request.isSeen = true;
      await requset.save();
      newRequests = true;
    }
  }

  res.statu(200).json({ newRequests, data: upcomingRequests });
});

exports.geteMchanicAcceptedRequests = catchAsyncErr(async (req, res, next) => {
  const acceptedRequests = await RequestModel.findOne({
    isActive: true,
    accepted: true,
    mechanic: req.user._id,
  })
    .populate({ path: "service" })
    .populate({ path: "driver" })
    .populate({ path: "car" })
    .populate({ path: "mechanic" });

  res.statu(200).json({ data: acceptedRequests });
});

//////////////////    WINCH    ///////////////////
exports.acceptWinchRequest = catchAsyncErr(async (req, res, next) => {
  const {driverId}= req.body
  let request = RequestModel.findOne({
    driver: driverId,
    winch: req.user._id,
  })
    .populate({ path: "service" })
    .populate({ path: "driver" })
    .populate({ path: "car" })
    .populate({ path: "winch" });
  if (!request) {
    return next(new AppErr("No request found for this driver and winch", 404));
  }

  reqest.isActive = true;
  request.accepted = true;
  await request.save();

  const chat = await createChat(driverId, req.user._id);
  if (!chat) {
    reqest.isActive = false;
    request.accepted = false;
    await request.save();
    return next(
      new AppErr(
        "Sorry, something went wrong, repeat this request again please",
        500
      )
    );
  }

  res.status(200).json({ data: request });
});

exports.getWinchUpcomingRequests = catchAsyncErr(async (req, res, next) => {
  let newRequests = false;

  const upcomingRequests = await RequestModel.findOne({
    isActive: false,
    accepted: false,
    winch: req.user._id,
  })
    .populate({ path: "service" })
    .populate({ path: "driver" })
    .populate({ path: "car" })
    .populate({ path: "winch" });

  for (request of upcomingRequests) {
    if (request.isSeen === false) {
      request.isSeen = true;
      await requset.save();
      newRequests = true;
    }
  }

  res.statu(200).json({ newRequests, data: upcomingRequests });
});

exports.getWinchAcceptedRequests = catchAsyncErr(async (req, res, next) => {
  const acceptedRequests = await RequestModel.findOne({
    isActive: true,
    accepted: true,
    winch: req.user._id,
  })
    .populate({ path: "service" })
    .populate({ path: "driver" })
    .populate({ path: "car" })
    .populate({ path: "winch" });

  res.statu(200).json({ data: acceptedRequests });
});

/////////////////////   ADMIN   ///////////////////

exports.getSeasonsAnalytics = catchAsyncErr(async (req, res, next) => {
  const requestsCount = await RequestModel.countDocuments();
  const requests = await RequestModel.find();

  let seasons = {
    summer: 0,
    winter: 0,
    autumn: 0,
    spring: 0,
  };

  for (const request of requests) {
    const requestMonth = request.created_at.getMonth + 1;
    if (requestMonth in [3, 4, 5]) {
      seasons.spring = seasons.spring + 1;
    } else if (requestMonth in [6, 7, 8]) {
      seasons.summer = seasons.summer + 1;
    } else if (requestMonth in [9, 10, 11]) {
      seasons.autumn = seasons.autumn + 1;
    } else {
      seasons.winter = seasons.winter + 1;
    }
  }

  seasons.spring = (seasons.spring / requestsCount) * 100;
  seasons.summer = (seasons.summer / requestsCount) * 100;
  seasons.autumn = (seasons.autumn / requestsCount) * 100;
  seasons.winter = (seasons.winter / requestsCount) * 100;

  res.status(200).json({ data: seasons });
});

////////////
exports.createRequest = factory.createOne(RequestModel);

// //get specific request with id
// exports.getRequest = factory.getOne(RequestModel);

// // update specific request with id
// exports.updateRequest = factory.updateOne(RequestModel);

// // delete specific request with id
// exports.deleteRequest = factory.deleteOne(RequestModel);
