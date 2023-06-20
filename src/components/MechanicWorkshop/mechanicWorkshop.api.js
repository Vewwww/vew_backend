const {
  getNearestMechanicWorkshop,
  createMechanicWorkshop,
} = require("./mechanicWorkshop.services");
const {
  signup,
  emailVerify,
  authinticate,
} = require("./mechanicWorkshop.auth");
const { allowedTo } = require("../Handlers/auth.factory");
const mechanicValidation = require("./mechanicWorkshop.validator");
const requestRoutes= require("../request/request.api")
const router = require("express").Router();
router.use("/request", authinticate, allowedTo("winch"), requestRoutes);

// router.use('/:mechanitId/request', requestRoute);
router.post("/signup", mechanicValidation, signup, createMechanicWorkshop);
router.get("/getNearestMechanicWorkshop",getNearestMechanicWorkshop);
router.get("/verify/:token", emailVerify);
module.exports = router;
