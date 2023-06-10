const {
  signup,
  ProtectedRoutes,
  allowedTo,
  emailVerify,
} = require("./driver.auth");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
} = require("./driver.services");
const driverValidation = require("./driver.validator");

const router = require("express").Router();
router
  .route("/")
  .post(ProtectedRoutes, createUser)
  .get(ProtectedRoutes, getUsers);
router
  .route("/:id")
  .get(ProtectedRoutes, getUser)
  .put(ProtectedRoutes, updateUser)
  .delete(ProtectedRoutes, deleteUser);
router.patch("/changePassword/:id", ProtectedRoutes, changePassword);
router.post("/signup",driverValidation ,signup,createUser);
router.get("/verify/:token", emailVerify);

module.exports = router;
