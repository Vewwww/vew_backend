const {
  addAdmin,
  userStatistics,
  getGenderAnalytic,
  tenModelsHadIssues,
  getSeasonsAnalytics,
  getUsers,
  getUser,
  getAdmins,
} = require('./admin.services');
const { authinticate, emailVerify } = require('../driver/driver.auth');
const { allowedTo } = require('../Handlers/auth.factory');

const maintenanceRoute = require('../MaintenanceCenter/maintenanceCenter.api');
const gasStationRoute = require('../GasStation/gasStation.api');
const mechanicRoute = require('../MechanicWorkshop/mechanicWorkshop.api');
const driverRoute = require('./driver.api');
const winchRoute = require('../winch/winch.api');

const router = require('express').Router();

router.use('/maintenanceCenter', authinticate, allowedTo('admin'), maintenanceRoute);
router.use('/gasStation', authinticate, allowedTo('admin'), gasStationRoute);
router.use('/mechanic', authinticate, allowedTo('admin'), mechanicRoute);
router.use('/driver', authinticate, allowedTo('admin'), driverRoute);
router.use('/winch', authinticate, allowedTo('admin'), winchRoute);

router.route('/').post(authinticate, allowedTo('admin'), addAdmin).get(authinticate, allowedTo('admin'), getUsers);
router.get('/admins', authinticate, allowedTo('admin'), getAdmins);
router.get('/verify/:token', emailVerify);
router.route('/userStatistics').get(authinticate, allowedTo('admin'), userStatistics);
router.get('/genderAnalytics', authinticate, allowedTo('admin'), getGenderAnalytic);
router.get('/topModelsHadIssues', authinticate, allowedTo('admin'), tenModelsHadIssues);
router.get('/seasonsAnalytics', authinticate, allowedTo('admin'), getSeasonsAnalytics);
router.route('/:id').get(authinticate, allowedTo('admin'), getUser);

module.exports = router;
