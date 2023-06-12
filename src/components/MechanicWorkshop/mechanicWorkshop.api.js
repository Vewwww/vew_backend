const {
  signup,
  emailVerify,
  getNearestMechanicWorkshop,
  createMechanicWorkshop 
  
} = require("./mechanicWorkshop.services");
const mechanicValidation = require("./mechanicWorkshop.validator");

const router = require("express").Router();

// router.use('/:mechanitId/request', requestRoute);
router.post("/signup",mechanicValidation, signup,createMechanicWorkshop);

router.get("/getNearestMechanicWorkshop", getNearestMechanicWorkshop);
router.get("/verify/:token", emailVerify);
module.exports = router;
