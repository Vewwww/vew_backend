const {
  getNearestWinch,
  createWinch,
  reportWinch,
  rateWinch,
  getWinch,
  getWinches,
} = require("./winch.services");
const { signup, emailVerify, authinticate } = require("./winch.auth");
const { allowedTo } = require("../Handlers/auth.factory");
winchValidation = require("./winch.validator");
const router = require("express").Router();
const requestRoutes = require("../request/request.api");
const chatRoute = require("../chat/chat.api")

router.use("/request", authinticate, allowedTo("winch"), requestRoutes);
router.use("/chat", authinticate, allowedTo("winch"), chatRoute);
router.post("/signup", winchValidation, signup, createWinch);
router.get("/verify/:token", emailVerify);
router.get("/getNearestWinch", getNearestWinch);
router.patch("/report/:id", reportWinch);
router.patch("/rate/:id", rateWinch);
router.get("/", getWinches)

module.exports = router;
