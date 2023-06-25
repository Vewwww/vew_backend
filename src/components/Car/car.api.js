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

router.route("/").post(carValidation,createCar).get(getCars);
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar);
router.route("/carOwner/:driverId").get(getCarsOfDriver)
module.exports = router;
