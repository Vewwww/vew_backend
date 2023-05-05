const express = require("express");
const {
  createLocation,
  getLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} = require("./location.services");

const router = express.Router();

router.route("/").post(createLocation).get(getLocations);
router.route("/:id").get(getLocation).put(updateLocation).delete(deleteLocation);

module.exports = router;
