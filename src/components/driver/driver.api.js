const {
  signup,
  emailVerify,
  changePassword,
  authinticate,
} = require("./driver.auth");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  reportDriver,
  getGenderAnalytic,

} = require("./driver.services");
const { allowedTo } = require("../Handlers/auth.factory");
const driverValidation = require("./driver.validator");
const maintenanceRoute = require("../MaintenanceCenter/maintenanceCenter.api");
const requestRoute = require("../request/request.api");
const chatRoute = require("../chat/chat.api")

const router = require("express").Router();

router.use(
  "/maintenanceCenter",
  authinticate,
  allowedTo("user"),
  maintenanceRoute
);
router.use(
  "/request",
  authinticate,
  requestRoute
);
router.use(
  "/chat",
  authinticate,
  allowedTo("user"),
  chatRoute
);


router.route("/").get(authinticate, allowedTo("admin"), getUsers);
router.get("/genderAnalytic",getGenderAnalytic);

router
  .route("/:id")
  .get(authinticate, allowedTo("admin"), getUser)
  .put(authinticate, allowedTo("user"), driverValidation, updateUser);
router.patch(
  "/changePassword/:id",
  authinticate,
  allowedTo("user"),
  changePassword
);
router.post("/signup", driverValidation, signup, createUser);
router.get("/verify/:token", emailVerify);
router.patch("/report/:id",reportDriver);
module.exports = router;
