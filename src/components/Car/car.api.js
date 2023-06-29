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

router.route("/").post(carValidation,createCar).get(getCars);
router.route("/:id").get(getCar).put(carValidation,authinticate,updateCar).delete(authinticate,deleteCar);
router.route("/carOwner/:driverId").get(getCarsOfDriver)
module.exports = router;
