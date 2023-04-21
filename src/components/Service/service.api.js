const express = require("express");
const {
  createService,
  getServices,
  getService,
  updateService,
deleteService,
} = require("./service.services");

const router = express.Router();

router.route("/").post(createService).get(getServices);
router.route("/:id").get(getService).put(updateService).delete(deleteService);

module.exports = router;
