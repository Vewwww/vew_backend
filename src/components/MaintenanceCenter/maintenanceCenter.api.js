const express = require("express");
const {getNearestMaintenanceCenters}  = require("./maintenanceCenter.services");

const router = express.Router();

router.route("/getNearestMaintenanceCenters").get(getNearestMaintenanceCenters);

module.exports = router;
