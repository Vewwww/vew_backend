
const express = require("express");
const {
  createGasStation,
  getGasStations,
  getGasStation,
  updateGasStation,
deleteGasStation,
  getNearestGasStations
} = require("./gasStation.services");

const router = express.Router();
router.get("/", getNearestGasStations);
router.route("/").post(createGasStation).get(getGasStations);
router.route("/:id").get(getGasStation).put(updateGasStation).delete(deleteGasStation);

module.exports = router;
