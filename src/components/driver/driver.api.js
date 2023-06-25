const {signup,emailVerify,changePassword,authinticate} = require("./driver.auth");
const {createUser,getUsers,getUser,updateUser,reportDriver,} = require("./driver.services");
const { allowedTo } = require("../Handlers/auth.factory");
const driverValidation = require("./driver.validator");
const maintenanceRoute = require("../MaintenanceCenter/maintenanceCenter.api");
const requestRoute = require("../request/request.api");
const carRoute=require("../Car/car.api")
const router = require("express").Router();

router.use("/maintenanceCenter",authinticate,allowedTo("user"),maintenanceRoute);
router.use("/request",authinticate,requestRoute);
router.use("/car",authinticate,allowedTo("user"),carRoute)

.put(authinticate, allowedTo("user"), driverValidation, updateUser);
router.patch("/changePassword/:id",authinticate,allowedTo("user"),changePassword);
router.post("/signup", driverValidation, signup, createUser);
router.get("/verify/:token", emailVerify);
router.patch("/report/:id",reportDriver);
module.exports = router;
