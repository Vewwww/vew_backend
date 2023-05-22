const {
  signup,
  signin,
  emailVerify,
  getNearestMechanicWorkshop,
} = require("./mechanicWorkshop.services");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/getNearestMechanicWorkshop", getNearestMechanicWorkshop);
router.get("/verify/:token", emailVerify);
module.exports = router;
