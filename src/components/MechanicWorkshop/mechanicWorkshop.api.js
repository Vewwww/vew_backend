const {
  signup,
  emailVerify,
  getNearestMechanicWorkshop,
} = require("./mechanicWorkshop.services");

const router = require("express").Router();

router.post("/signup", signup);

router.get("/getNearestMechanicWorkshop", getNearestMechanicWorkshop);
router.get("/verify/:token", emailVerify);
module.exports = router;
