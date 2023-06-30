const express = require("express");
const {
  getUserChats,
  deleteChat,
  createChatCrud,
} = require("./chat.services");

const router = express.Router();



module.exports = router;
