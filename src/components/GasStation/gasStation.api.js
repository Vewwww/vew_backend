const express = require("express");
const {
  createGasStation,
  getGasStations,
  getGasStation,
  updateGasStation,
deleteGasStation,
} = require("./gasStation.services");

const router = express.Router();

router.route("/").post(createGasStation).get(getGasStations);
router.route("/:id").get(getGasStation).put(updateGasStation).delete(deleteGasStation);

module.exports = router;
