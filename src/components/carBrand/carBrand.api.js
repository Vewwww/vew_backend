const express = require("express");
const {
  createCarType,
  getCarTypes,
  getCarType,
  updateCarType,
  deleteCarType,
} = require("./carBrand.services");
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");
const router = express.Router();

router.route("/").post(authinticate,allowedTo("admin"),createCarType).get(authinticate,allowedTo("admin"),getCarTypes);
router.route("/:id").get(authinticate,allowedTo("admin"),getCarType).put(authinticate,allowedTo("admin"),updateCarType).delete(authinticate,allowedTo("admin"),deleteCarType);

module.exports = router;
