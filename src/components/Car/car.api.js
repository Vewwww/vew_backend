const router = require("express").Router();
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  getCarsOfDriver,
} = require("./car.services");
const carValidation = require("./car.validator");
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");
router.route("/").post(authinticate,allowedTo("user"),carValidation,createCar).get(authinticate,allowedTo("user"),getCars);
router.route("/:id").get(authinticate,allowedTo("user"),getCar).put(authinticate,allowedTo("user"),updateCar).delete(authinticate,allowedTo("user"),deleteCar);
router.route("/driver/:owner").get(authinticate,allowedTo("user"),getCarsOfDriver)
module.exports = router;
