const authFactory = require("./auth.factory")

const router=require("express").Router()
router.post('/login', authFactory.login)
router.get('/logout', authFactory.logout)
router.post('/forgetPassword',authFactory.forgetPassword)
router.get('/verifyPassword/:token',authFactory.verifyPassword)
router.post('/resetPassword',authFactory.resetPassword)
module.exports=router