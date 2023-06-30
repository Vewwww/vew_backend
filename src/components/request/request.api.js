const express = require("express");
const {
  createRequest,
  acceptWinchRequest,
  getWinchUpcomingRequests,
  getWinchAcceptedRequests,
  acceptMechanicRequest,
  getMechanicUpcomingRequests,
  geteMchanicAcceptedRequests,
  getDriverPendingRequests,
  getDriverCurrentRequests,
  getPreviousRequests,
} = require("./request.services");
const { authinticate } = require("../driver/driver.auth");
const router = express.Router();


//////////////////    WINCH    ///////////////////
router.route("/acceptWinchRequest").get(acceptWinchRequest);
router.route("/getWinchUpcomingRequests").get(getWinchUpcomingRequests);
router.route("/getWinchAcceptedRequests").get(getWinchAcceptedRequests);

//////////////////    Mechanic    ///////////////////
router.route("/acceptMechanicRequest").get(acceptMechanicRequest);
router.route("/getMechanicUpcomingRequests").get(getMechanicUpcomingRequests);
router.route("/geteMchanicAcceptedRequests").get(geteMchanicAcceptedRequests);

//////////////////    Driver    ///////////////////


module.exports = router
