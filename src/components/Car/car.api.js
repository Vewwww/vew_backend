const express = require("express");
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require("./car.services");
const carValidation = require("./car.validator");

const router = express.Router();

router.route("/").post(carValidation,createCar).get(getCars);
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar);

module.exports = router;
