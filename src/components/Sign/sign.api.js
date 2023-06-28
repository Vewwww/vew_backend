const { uploadSingleFile, resizeImage } = require("../../utils/fileUpload");
const { createSign, getSign, getSigns } = require("./sign.services");

const router = require("express").Router();
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");
router.route("/").post(authinticate,allowedTo("admin"),uploadSingleFile('image'),resizeImage,createSign).get(getSigns)
router.route("/:id").get(getSign)
module.exports=router;