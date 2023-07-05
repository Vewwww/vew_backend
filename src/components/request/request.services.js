const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const RequestModel = require('./request.model');
const MechanistModel = require('./request.model');
const AppErr = require('../../utils/AppError');
const { createChat } = require('../chat/chat.services');
const factory = require('../Handlers/handler.factory');
const { boolean } = require('joi');
const { createNotification } = require('../notification/notification.services');

const io = require('socket.io-client');
const socket = io(`${process.env.BaseUrl}`);

//get Driver Current Requests
exports.getDriverCurrentRequests = catchAsyncErr(async (req, res) => {
  const document = await RequestModel.find({
    isActive: true,
    accepted: true,
    driver: req.user._id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'service', select: '-__v' })
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'mechanic', select: 'name rate ownerName phoneNumber' })
    .populate({ path: 'winch', select: 'name plateNumber rate' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });
  res.status(200).json({ data: document });
});

//get driver pending req
exports.getDriverPendingRequests = catchAsyncErr(async (req, res) => {
  const document = await RequestModel.find({
    isActive: false,
    accepted: false,
    driver: req.user._id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'service', select: '-__v' })
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'mechanic', select: 'name rate ownerName phoneNumber' })
    .populate({ path: 'winch', select: 'name plateNumber rate' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });
  res.status(200).json({ data: document });
});
exports.getPreviousRequests = catchAsyncErr(async (req, res) => {
  const requests = await RequestModel.find({ isActive: false, accepted: true, driver: req.user._id })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'service', select: '-__v' })
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'mechanic', select: 'name rate ownerName phoneNumber' })
    .populate({ path: 'winch', select: 'name plateNumber rate' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });
  let isWinch;
  const result = [];
  requests.forEach((element) => {
    element.winch ? (isWinch = true) : false;
    result.push({ ...element._doc, isWinch: isWinch });
  });
  res.status(200).json({ data: result });
});

exports.createfilterObject = catchAsyncErr((req, res, next) => {
  let filterObject = {};
  if (req.params.mechnistId) {
    filterObject = { mechanist: req.params.mechnistId };
  }
  if (req.params.winchId) {
    filterObject = { winch: req.params.winchId };
  }
  req.filterObject = filterObject;
  next();
});

//create new request

//isactive false | accepted false      || pending request [user]  || upcoming request [mechanic]
//isActive true  | accepted true       || current request [user]  || Accepted request
//isactive false | accepted true       || previos request [user]  ||

// protectedRoute
exports.getMechanicPendingRequests = catchAsyncErr(async (req, res, next) => {
  const upcomingRequests = await RequestModel.find({
    isActive: false,
    accepted: false,
    mechanist: req.user._id,
  });
  res.status(200).json({ data: upcomingRequests });
});

exports.endRequest = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const request = await RequestModel.findOneAndUpdate(
    { _id: id },
    {
      isActive: false,
      accepted: true,
    },
    { new: true }
  );

  if (!request) {
    return next(new AppErr('No request found for this driver and mechanic', 404));
  }
  res.status(200).json({ message: 'request has been end successfuly' });
});

///////////////   MECHANIC    ////////////////////
exports.acceptMechanicRequest = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  let request = await RequestModel.findOne({
    _id: id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'service', select: '-__v' })
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'mechanic', select: 'name rate ownerName phoneNumber' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });
  if (!request) {
    return next(new AppErr('No request found for this id', 404));
  }

  let roomData = { room: req._id };
  socket.emit('emit-request-accepted-or-rejected', roomData) 

  request.isActive = true;
  request.accepted = true;
  await request.save();

  const chat = await createChat(request.driver, req.user._id);
  if (!chat) {
    reqest.isActive = false;
    request.accepted = false;
    await request.save();
    return next(new AppErr('Sorry, something went wrong, repeat this request again please', 500));
  }

  res.status(200).json({ data: request });
});

exports.getMechanicUpcomingRequests = catchAsyncErr(async (req, res, next) => {
  const newRequests = false;

  const upcomingRequests = await RequestModel.find({
    isActive: false,
    accepted: false,
    mechanic: req.user._id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'service', select: '-__v' })
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'mechanic', select: 'name rate ownerName phoneNumber' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });

  for (let request of upcomingRequests) {
    if (request.isSeen === false) {
      request.isSeen = true;
      await request.save();
      newRequests = true;
    }
  }

  res.status(200).json({ newRequests, data: upcomingRequests });
});

exports.geteMchanicAcceptedRequests = catchAsyncErr(async (req, res, next) => {
  const acceptedRequests = await RequestModel.find({
    isActive: true,
    accepted: true,
    mechanic: req.user._id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'service', select: '-__v' })
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'mechanic', select: 'name rate ownerName phoneNumber' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });

  res.status(200).json({ data: acceptedRequests });
});

//////////////////    WINCH    ///////////////////
exports.acceptWinchRequest = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  let request = await RequestModel.findById(id)
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'winch', select: 'name plateNumber rate' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });
  if (!request) {
    return next(new AppErr('No request found for this id', 404));
  }

  let roomData = { room: request._id };
  socket.emit('emit-request-accepted-or-rejected', roomData);

  request.isActive = true;
  request.accepted = true;
  await request.save();

  const chat = await createChat(request.driver, req.user._id);
  if (!chat) {
    reqest.isActive = false;
    request.accepted = false;
    await request.save();
    return next(new AppErr('Sorry, something went wrong, repeat this request again please', 500));
  }

  res.status(200).json({ data: request });
});

exports.getWinchUpcomingRequests = catchAsyncErr(async (req, res, next) => {
  let newRequests = false;

  const upcomingRequests = await RequestModel.find({
    isActive: false,
    accepted: false,
    winch: req.user._id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'winch', select: 'name plateNumber rate' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });

  for (let request of upcomingRequests) {
    if (request.isSeen === false) {
      request.isSeen = true;
      await request.save();
      newRequests = true;
    }
  }

  res.status(200).json({ newRequests, data: upcomingRequests });
});

exports.getWinchAcceptedRequests = catchAsyncErr(async (req, res, next) => {
  const acceptedRequests = await RequestModel.find({
    isActive: true,
    accepted: true,
    winch: req.user._id,
  })
    .select('-__v -isSeen -isActive -accepted')
    .populate({ path: 'driver', select: 'name phoneNumber' })
    .populate({ path: 'winch', select: 'name plateNumber rate' })
    .populate({
      path: 'car',
      populate: { path: 'carType', model: 'carType', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'color', select: '-__v' },
      select: '-owner',
    })
    .populate({
      path: 'car',
      populate: { path: 'carModel', select: '-__v -brand' },
      select: '-owner',
    });

  res.status(200).json({ data: acceptedRequests });
});

exports.rejectRequest = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  let request = await RequestModel.find({ _id: id });

  if (!request) {
    return next(new AppErr('no request found for this id', 404));
  }

  const date = new Date();
  const message = `Your request has been rejected unfortunately, please make another request`;
  await createNotification(date, message, request.driver);

  request = await RequestModel.findOneAndDelete({
    _id: id,
  });

  res.status(204).json({ data: 'request rejected successfuly' });
});

////////////
exports.createRequest = catchAsyncErr(async (req, res) => {
  const document = await RequestModel.create(req.body);
  if (document.winch) {
    let roomData = { room: document.winch };
    socket.emit('emit-request-created', roomData);
  }
  if (document.mechanic) {
    let roomData = { room: document.mechanic };
    socket.emit('emit-request-created', roomData); 
  }

  res.status(200).json({
    data: document,
  });
});

// //get specific request with id
// exports.getRequest = factory.getOne(RequestModel);

// // update specific request with id
// exports.updateRequest = factory.updateOne(RequestModel);

// // delete specific request with id
exports.deleteRequest = factory.deleteOne(RequestModel);
