const {
  getNearestWinch,
  createWinch,
  reportWinch,
  rateWinch,
} = require("./winch.services");
const {
  signup,
  emailVerify,
  authinticate
} = require("./winch.auth");
winchValidation=require("./winch.validator");
const router = require("express").Router();

router.post("/signup", winchValidation,signup,createWinch);
router.get("/verify/:token", emailVerify);
router.get("/getNearestWinch", getNearestWinch);
router.patch("/report/:id",reportWinch);
router.patch("/rate/:id",rateWinch);

module.exports = router;
