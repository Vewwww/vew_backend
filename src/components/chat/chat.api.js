const express = require("express");
const {
  getUserChats,
  deleteChat,
  createChatCrud,
} = require("./chat.services");

const router = express.Router();

router.route("/").post(createChatCrud).get(getUserChats);
router.route("/:id").delete(deleteChat);
module.exports = router;
