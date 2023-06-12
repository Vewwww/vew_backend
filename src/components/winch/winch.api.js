const {
  signup,
  emailVerify,
  getNearestWinch,
} = require("./winch.services");

const router = require("express").Router();
router.post("/signup", signup);
router.get("/verify/:token", emailVerify);
router.get("/getNearestWinch", getNearestWinch);
module.exports = router;
