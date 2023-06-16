const express = require("express");
const {
  createCarType,
  getCarTypes,
  getCarType,
  updateCarType,
  deleteCarType,
} = require("./carBrand.services");

const router = express.Router();

router.route("/").post(createCarType).get(getCarTypes);
router.route("/:id").get(getCarType).put(updateCarType).delete(deleteCarType);

module.exports = router;
