const router = require("express").Router();
const {getNearestGasStations } = require("./gasStation.services");
  
  
router.get("/getNearestGasStations", getNearestGasStations);

module.exports = router;