const ChatModel = require('./chat.model');
const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const factory = require('../Handlers/handler.factory');
const DriverModel = require('../driver/driver.model');
const WinchModel = require('../winch/winch.model');
const MechanicWorkshopModel = require('../MechanicWorkshop/mechanicWorkshop.model');
const AppErr = require('../../utils/AppError');

const populateUser = async (userId) => {
  var user;
  user = await DriverModel.findById(userId).select('name -_id');
  if (user) return user;
  else {
    user = await WinchModel.findById(userId).select('name -_id');
    if (user) return user;
    else {
      user = MechanicWorkshopModel.findById(userId).select('name -_id');
      if (user) return user;
    }
  }
  return user;
};

const populateTheOtherUser = async (usersIds, chatsOwnerId) => {
  var user;

  for (const userId of usersIds) {
    if (userId.toString() != chatsOwnerId.toString()) {
      user = await populateUser(userId);
    }
  }

  return user;
};

exports.createChat = async (driverId, serviceProvider) => {
  const chatObject = {
    participants: [driverId, serviceProvider],
    messages: [],
  };
  const chat = await ChatModel.create(chatObject);
  return chat;
};

exports.addSeenMessage = async (data) =>
  (chat = await ChatModel.findByIdAndUpdate(
    { _id: data.chatId },
    {
      $push: {
        messages: {
          sender: data.sender,
          content: data.content,
          time: new Date(),
          seen: true,
        },
      },
    }
  ));
exports.addUnSeenMessage = async (data) => {
  chat = await ChatModel.findByIdAndUpdate(
    { _id: data.chatId },
    {
      $push: {
        messages: {
          sender: data.sender,
          content: data.content,
          time: new Date(),
          seen: false,
        },
      },
    }
  );
};

exports.getUserChats = catchAsyncErr(async (req, res, next) => {
  let newChats = false;

  const chats = await ChatModel.find({
    participants: { $type: 'array', $elemMatch: { $eq: req.user._id } },
  });

  let name = '';
  if (chats.length < 1) res.status(200).json({ newChats, data: [] });

  let chatName = {};
  for (let i = 0; i < chats.length; i++) {
    chatName = await populateTheOtherUser(chats[i].participants, req.user._id);
    chats[i].chatName = chatName.name;

    if (chats[i].messages.length < 1) {
      newChats = true;
    }
    for (let j = 0; j < chats[i].messages.length; j++) {
      if (chats[i].messages[j].sender.toString() != req.user._id.toString() && chats[i].messages[j].seen === false) {
        newChats = true;
        await ChatModel.findOneAndUpdate(
          { _id: chats[i]._id, 'messages._id': chats[i].messages[j]._id },
          {
            $set: {
              'messages.$.seen': true,
            },
          }
        );
      }
    }
  }

  res.status(200).json({
    newChats,
    result: chats.length,
    data: chats,
  });
});

exports.getChat = catchAsyncErr(async (req, res, next) => {
  const chat = await ChatModel.findById(req.params.id);

  if (!chat) return next(new AppErr('no chat found with this id', 404));

  res.status(200).json({ data: chat });
});
exports.createChatCrud = factory.createOne(ChatModel);
exports.deleteChat = catchAsyncErr(async (req, res) => {
  const chat = await ChatModel.findOneAndDelete({ _id: req.params.id });

  if (!chat) return next(new AppErr('no chat found with this id', 404));

  res.status(204).send();
});
