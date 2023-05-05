const { signup, signin } = require("./driver.services");

const router=require("express").Router()

router.post('/signup', signup)
router.post('/signin', signin)
module.exports = router;