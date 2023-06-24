const router = require("express").Router();
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require("./car.services");
const carValidation = require("./car.validator");
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");
router.route("/").post(authinticate,allowedTo("driver"),carValidation,createCar).get(authinticate,allowedTo("driver"),getCars);
router.route("/:id").get(authinticate,allowedTo("driver"),getCar).put(authinticate,allowedTo("driver"),updateCar).delete(authinticate,allowedTo("driver"),deleteCar);
module.exports = router;
