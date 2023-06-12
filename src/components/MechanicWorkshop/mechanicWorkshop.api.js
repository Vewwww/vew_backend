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

const router = require("express").Router();

// router.use('/:mechanitId/request', requestRoute);
router.post("/signup", mechanicValidation, signup, createMechanicWorkshop);

router.get("/getNearestMechanicWorkshop",getNearestMechanicWorkshop);
router.get("/verify/:token", emailVerify);
module.exports = router;
