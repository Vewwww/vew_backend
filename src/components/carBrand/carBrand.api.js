const express = require("express");
const {
  createCarType,
  getCarTypes,
  getCarType,
  updateCarType,
  deleteCarType,
  sortCarType,
} = require("./carBrand.services");
const { authinticate } = require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");
const router = express.Router();
router.route("/sort").get(sortCarType);
router.route("/").post(authinticate, allowedTo("admin"), createCarType).get(sortCarType);
router.route("/:id").get(getCarType).put(authinticate, allowedTo("admin"), updateCarType).delete(authinticate, allowedTo("admin"), deleteCarType);

module.exports = router;
