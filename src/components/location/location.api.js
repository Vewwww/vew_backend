const express = require("express");
const { createLocation } = require("./location.services");

const router = express.Router();

router.route("/").post(createLocation);

module.exports = router;
