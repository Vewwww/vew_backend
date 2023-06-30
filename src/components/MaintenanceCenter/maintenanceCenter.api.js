const express = require("express");

const {maintenanceValidation,validateLatandLon}=require("./maintenanceCenter.validator");

const {
  createMaintenanceCenter,
  getMaintenanceCenters,
  getMaintenanceCenter,
  updateMaintenanceCenter,
  deleteMaintenanceCenter,
  getNearestMaintenanceCenters
} = require("./maintenanceCenter.services");

const router = express.Router();

// router.route("/:id").get(getMaintenanceCenter);



module.exports = router;
