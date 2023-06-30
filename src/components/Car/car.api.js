const router = require("express").Router();
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  getCarsOfDriver,
} = require("./car.services");
const {authinticate} = require("../driver/driver.auth")
const carValidation = require("./car.validator");



module.exports = router;
