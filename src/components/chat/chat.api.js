const express = require("express");
const {
  getUserChats,
  getChat,
  deleteChat,
  addNewMessages,
} = require("./chat.services");

const router = express.Router();

router.route("/:userId").get(getUserChats);
router.route("/:id").get(getChat).delete(deleteChat);
router.route("/addNewMessages/:id").put(addNewMessages);

module.exports = router;
