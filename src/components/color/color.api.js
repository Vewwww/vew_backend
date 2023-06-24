const express = require("express");
const {
  createColor,
  getColor,
  getColors,
  deleteColor,
  updateColor,
} = require("./color.services");

const router = express.Router();
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");
router.route("/").post(authinticate,allowedTo("admin"),createColor).get(authinticate,allowedTo("user"),getColors);
router.route("/:id").get(authinticate,allowedTo("admin"),getColor).put(authinticate,allowedTo("user"),updateColor).delete(authinticate,allowedTo("admin"),deleteColor);

module.exports = router;
