const express = require("express");
const {
  createWinch,
  getWinch,
  getWinches,
  updateWinch,
  deleteWinch,
} = require("./winch.services");

const router = express.Router();

router.route("/").post(createWinch).get(getWinches);
router.route("/:id").get(getWinch).put(updateWinch).delete(deleteWinch);

module.exports = router;
