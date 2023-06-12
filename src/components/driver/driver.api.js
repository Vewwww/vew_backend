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
} = require("./driver.services");
const { allowedTo } = require("../Handlers/auth.factory");

const driverValidation = require("./driver.validator");
const maintenanceRoute = require("../MaintenanceCenter/maintenanceCenter.api");
const router = require("express").Router();

router.use(
  "/maintenanceCenter",
  authinticate,
  allowedTo("user"),
  maintenanceRoute
);
router.use(
  "/maintenanceCenter",
  authinticate,
  allowedTo("user"),
  maintenanceRoute
);

router.route("/").get(authinticate, allowedTo("admin"), getUsers);
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

module.exports = router;
