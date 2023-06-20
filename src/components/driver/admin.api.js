const { allowedTo,authinticate } = require("../Handlers/auth.factory")
const { addAdmin, userStatistics } = require("./admin.serivices")

const router = require("express").Router()

router.route("/").post(allowedTo("admin"), addAdmin)
router.route("/userStatistics").get(userStatistics)

module.exports = router