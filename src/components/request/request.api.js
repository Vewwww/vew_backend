const express = require("express");
const {
  createRequest,
  getRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} = require("./request.services");

const router = express.Router();

router.route("/").post(createRequest).get(getRequests);
router.route("/:id").get(getRequest).put(updateRequest).delete(deleteRequest);

module.exports = router;
