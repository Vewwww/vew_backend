const express = require("express");
const {
  createRequest,
  getRequest,
  getRequests,
  updateRequest,
  deleteRequest,
  getDriverPendingRequests,
  getDriverCurrentRequests,
  getPreviousRequests,
} = require("./request.services");
const { authinticate } = require("../driver/driver.auth");
const router = express.Router();

// router.route("/").post(createRequest).get(getRequests);
router.route("/").post(createRequest)
router.get("/getDriverPendingRequests", getDriverPendingRequests);
router.get("/getDriverCurrentRequests", getDriverCurrentRequests);
router.get("/previousRequests",getPreviousRequests)

router.route("/:id").get(getRequest).put(updateRequest).delete(deleteRequest);

module.exports = router;