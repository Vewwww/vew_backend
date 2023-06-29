const router = require("express").Router();
const { createModel, getModel, getModels, getModelOfBrand } = require("./carModel.services");
const { authinticate } = require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");

router.route("/").post(authinticate, allowedTo("admin"), createModel).get(getModels)
router.route("/:brandId").get(getModelOfBrand)
router.route("/:id").get(getModel)


module.exports = router;
