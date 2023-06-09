const factory = require("./handler.factory")

const router=require("express").Router()
router.post('/login', factory.login)
router.get('/logout', factory.logout)

module.exports=router