const router = require("express").Router();
const { createModel, getModel, getModels,getModelOfBrand } = require("./carModel.services");
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");

router.route("/").post(authinticate,allowedTo("admin"),createModel).get(authinticate,allowedTo("admin"),getModels)
router.route("/:brandId").get(authinticate,allowedTo("user"),getModelOfBrand)
router.route("/:id").get(authinticate,allowedTo("admin"),getModel)

module.exports=router;
