const { allowedTo } = require("../Handlers/auth.factory")
const { addAdmin, userStatistics } = require("./admin.serivices")

const router = require("express").Router()

router.route("/").post(allowedTo("admin"), addAdmin).get(userStatistics)

module.exports = router