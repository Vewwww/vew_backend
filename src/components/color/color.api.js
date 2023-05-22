const express = require("express");
const {
  createColor,
  getColor,
  getColors,
  deleteColor,
  updateColor,
} = require("./color.services");

const router = express.Router();

router.route("/").post(createColor).get(getColors);
router.route("/:id").get(getColor).put(updateColor).delete(deleteColor);

module.exports = router;
