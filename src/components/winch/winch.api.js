const {
  signup,
  emailVerify,
  getNearestWinch,
  createWinch
} = require("./winch.services");
winchValidation=require("./winch.validator");
const router = require("express").Router();

router.post("/signup", winchValidation,signup,createWinch);
router.get("/verify/:token", emailVerify);
router.get("/getNearestWinch", getNearestWinch);
module.exports = router;
