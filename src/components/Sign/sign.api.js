const { uploadSingleFile } = require("../../utils/fileUpload");
const { createSign, getSign, getSigns } = require("./sign.services");

const router = require("express").Router();

router.route("/").post(uploadSingleFile('image','signs'),createSign).get(getSigns)
router.route("/:id").get(getSign)
module.exports=router;