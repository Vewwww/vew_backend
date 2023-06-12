const authFactory = require("./auth.factory")

const router=require("express").Router()
router.post('/login', authFactory.login)
router.get('/logout', authFactory.logout)

module.exports=router