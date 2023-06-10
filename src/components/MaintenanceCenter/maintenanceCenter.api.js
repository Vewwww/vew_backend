const express = require("express");

const maintenanceValidation=require("./maintenanceCenter.validator");

const {
  createMaintenanceCenter,
  getMaintenanceCenters,
  getMaintenanceCenter,
  updateMaintenanceCenter,
deleteMaintenanceCenter,
  getNearestMaintenanceCenters
} = require("./maintenanceCenter.services");

const router = express.Router();
router.route("/getNearestMaintenanceCenters").get(getNearestMaintenanceCenters);
router.route("/").post( maintenanceValidation, createMaintenanceCenter).get(getMaintenanceCenters);
router.route("/:id").get(getMaintenanceCenter).put(updateMaintenanceCenter).delete(deleteMaintenanceCenter);



module.exports = router;
