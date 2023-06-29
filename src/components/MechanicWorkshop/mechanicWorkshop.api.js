const {
  getNearestMechanicWorkshop,
  createMechanicWorkshop,
  reportMechanic,
  rateMechanic,
  getMechanicWorkshops,
} = require("./mechanicWorkshop.services");
const {
  signup,
  emailVerify,
  authinticate,
  changePassword
} = require("./mechanicWorkshop.auth");
const { allowedTo } = require("../Handlers/auth.factory");
const {mechanicValidation,validateLatandLon} = require("./mechanicWorkshop.validator");
const requestRoutes = require("../request/request.api");
const router = require("express").Router();
const chatRoute = require("../chat/chat.api");

router.use("/chat", authinticate, allowedTo("mechanic"), chatRoute);
router.use("/request", authinticate, allowedTo("mechanic"), requestRoutes);
// router.use('/:mechanitId/request', requestRoute);
router.post("/signup", mechanicValidation, signup, createMechanicWorkshop);
router.get("/getNearestMechanicWorkshop", validateLatandLon,getNearestMechanicWorkshop);
router.get("/verify/:token", emailVerify);
router.patch("/changePassword", authinticate, allowedTo("mechanic"), changePassword);
router.patch("/report/:id", reportMechanic);
router.patch("/rate/:id", rateMechanic);
router.get("/",getMechanicWorkshops)
module.exports = router;
