const { signup, signin, emailVerify } = require("./mechanicWorkshop.services");

const router=require("express").Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/verify/:token',emailVerify)
module.exports = router;