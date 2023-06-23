const router = require("express").Router();
const { createModel, getModel, getModels,getModelOfBrand } = require("./carModel.services");
router.route("/").post(createModel).get(getModels)
router.route("/:brandId").get(getModelOfBrand)
router.route("/:id").get(getModel)

module.exports=router;
