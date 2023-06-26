const {
  addAdmin,
  userStatistics,
  getGenderAnalytic,
  tenModelsHadIssues,
  getSeasonsAnalytics,
  getUsers,
  getUser,
} = require('./admin.services');
const { authinticate } = require('../driver/driver.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const mechanicRoute = require("../MechanicWorkshop/mechanicWorkshop.api")
const driverRoute = require("./driver.api")
const winchRoute = require("../winch/winch.api")
const router = require('express').Router();
router.route('/').post(authinticate, allowedTo('admin'), addAdmin)
  .get(authinticate, allowedTo('admin'), getUsers)
router.use("/driver", authinticate, allowedTo('admin'), driverRoute)
router.use("/mechanic", authinticate, allowedTo('admin'), mechanicRoute)
router.use("/winch", authinticate, allowedTo('admin'), winchRoute);
router.route('/userStatistics').get(authinticate, allowedTo('admin'), userStatistics);
router.get('/genderAnalytics', authinticate, allowedTo('admin'), getGenderAnalytic);
router.get('/topModelsHadIssues', authinticate, allowedTo('admin'), tenModelsHadIssues);
router.get('/seasonsAnalytics', authinticate, allowedTo('admin'), getSeasonsAnalytics);
router.route('/:id').get(authinticate, allowedTo('admin'), getUser);




module.exports = router;
