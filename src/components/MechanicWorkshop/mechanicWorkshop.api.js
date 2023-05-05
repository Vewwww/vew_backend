const { signup, signin } = require("./mechanicWorkshop.services");

const router=require("express").Router()

router.post('/signup', signup)
router.post('/signin', signin)
module.exports = router;