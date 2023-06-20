const {
  getNearestWinch,
  createWinch,
  reportWinch,
  rateWinch,
} = require("./winch.services");
const { signup, emailVerify, authinticate } = require("./winch.auth");
const { allowedTo } = require("../Handlers/auth.factory");
winchValidation = require("./winch.validator");
const router = require("express").Router();

const requestRoutes = require("../request/request.api");
router.use("/request", authinticate, allowedTo("winch"), requestRoutes);
router.post("/signup", winchValidation, signup, createWinch);
router.get("/verify/:token", emailVerify);
router.get("/getNearestWinch", getNearestWinch);
router.patch("/report/:id", reportWinch);
router.patch("/rate/:id", rateWinch);

module.exports = router;
