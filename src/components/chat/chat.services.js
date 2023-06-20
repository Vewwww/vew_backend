const ChatModel = require("./chat.model");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const DriverModel = require("../driver/driver.model");
const WinchModel = require("../winch/winch.model");
const MechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const AppErr = require("../../utils/AppError");
// const ApiFeatures = require("../../utils/ApiFeatures");

const populateUser = (userId) =>
  catchAsyncErr(async () => {
    let user;
    user = await DriverModel.findById(userId);
    if (user) return user;
    else {
      const user = await WinchModel.findById(userId);
      if (user) return user;
      else {
        user = MechanicWorkshopModel.findById(userId);
        if (user) return user;
      }
    }

    return user;
  });

const populateTheOtherUser = (usersIds, chatsOwnerId) =>
  catchAsyncErr(async () => {
    let user;

    for (const userId of usersIds) {
      if (userId !== chatsOwnerId) {
        user = await populateUser(userId);
      }
    }

    return user;
  });

exports.createChat = catchAsyncErr(async (driverId, serviceProvider) => {
  const chatObject = {
    participants: [driverId, serviceProvider],
    messages: [],
  };
  const chat = await ChatModel.create(chatObject);
  return chat;
});

exports.addNewMessages = catchAsyncErr(async (req, res, next) => {
  const chat = await ChatModel.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { messages: { $each: req.body.messages } } },
    { new: true }
  );

  if (!chat) return next(new AppErr("no chat found with this id", 404));

  res.status(200).json({ status: "success", data: chat });
});

exports.getUserChats = catchAsyncErr(async (req, res, next) => {
  //get chats its participants contain userId and exclude chat messages
  const chats = await ChatModel.find({
    participants: { $type: "array", $elemMatch: { $eq: req.params.userId } },
  }).select("-messages -__v");

  if (chats.length < 0)
    return next(new AppErr("no chats found with this id", 404));

  //populate info of chat particpants
  const chatsOwner = await populateUser(req.params.userId);
  if (!chatsOwner) return next(new AppErr("no chats found with this id", 404));

  for (let i = 0; i < chats.length; i++) {
    let participants = [];
    participants.push(chatsOwner);
    const otherChatOwner = await populateTheOtherUser(
      chats[i].participants,
      req.params.userId
    );
    participants.push(otherChatOwner);
    if (participants.length < 2) break;
    chats[i].participants = participants;
  }

  //return the chats
  res.status(200).json({
    status: "success",
    result: chats.length,
    data: chats,
  });

  //get chats its participants contain userId and exclude chat messages by app-features way, but above way is cleaner
  //   const apiFeatures = new ApiFeatures(
  //     ChatModel.find({
  //       participants: { $type: "array", $elemMatch: { $eq: req.params.id } },
  //     }),
  //     { fields: "-messages , -__v" }
  //   ).fields();

  //   const { mongooseQuery } = apiFeatures;

  //   const chats = await mongooseQuery;
});

exports.getChat = catchAsyncErr(async (req, res, next) => {
  const chat = await ChatModel.findById(req.params.id);

  if (!chat) return next(new AppErr("no chat found with this id", 404));

  res.status(200).json({ data: chat });
});

exports.deleteChat = catchAsyncErr(async (req, res) => {
  const chat = await ChatModel.findOneAndDelete({ _id: req.params.id });

  if (!chat) return next(new AppErr("no chat found with this id", 404));

  res.status(204).send();
});
