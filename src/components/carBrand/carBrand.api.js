const express = require("express");
const {
  createCarType,
  getCarTypes,
  getCarType,
  updateCarType,
  deleteCarType,
  sortCarType,
} = require("./carBrand.services");
const router = express.Router();
router.route("/sort").get(sortCarType);
router.route("/").post(createCarType).get(sortCarType);
router.route("/:id").get(getCarType).put(updateCarType).delete(deleteCarType);

module.exports = router;
