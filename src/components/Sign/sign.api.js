const { uploadSingleFile, resizeImage } = require("../../utils/fileUpload");
const { createSign, getSign, getSigns } = require("./sign.services");

const router = require("express").Router();
const {authinticate}=require("../driver/driver.auth")
const { allowedTo } = require("../Handlers/auth.factory");


module.exports=router;