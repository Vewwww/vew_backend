const { emailVerify, signin } = require("./handler.factory")

const router=require("express").Router()
router.post('/signin', signin)
module.exports=router