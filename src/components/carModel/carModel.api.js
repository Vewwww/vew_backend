const router = require("express").Router();
const { createModel, getModel, getModels, getModelOfBrand, sortCarModel } = require("./carModel.services");
const { authinticate } = require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");

router.route("/").post(authinticate, allowedTo("admin"), createModel).get(sortCarModel)
router.route("/:brandId").get(getModelOfBrand)
router.route("/:id").get(getModel)

module.exports = router;
