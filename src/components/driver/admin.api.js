const {
  addAdmin,
  userStatistics,
  getGenderAnalytic,
  tenModelsHadIssues,
  getSeasonsAnalytics,
  getUsers,
  getUser,
  getAdmins,
  getProfile,
  updateProfile,
  getTopAreasHadIssue,
  getTopRoadsHadIssue,
} = require('./admin.services');
const { authinticate, emailVerify } = require('../driver/driver.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const { maintenanceValidation } = require('../MaintenanceCenter/maintenanceCenter.validator');
const {
  createMaintenanceCenter,
  getMaintenanceCenters,
  updateMaintenanceCenter,
  deleteMaintenanceCenter,
} = require('../MaintenanceCenter/maintenanceCenter.services');
const {
  createGasStation,
  getGasStations,
  updateGasStation,
  deleteGasStation,
} = require('../GasStation/gasStation.services');

const { createCase } = require("../CBR/Case/case.services");
const { caseValidation } = require("../CBR/Case/case.validator");
const { createQuestion } = require("../CBR/Question/question.services");
const { questionValidation } = require("../CBR/Question/question.validator");
const { getMechanicWorkshops } = require('../MechanicWorkshop/mechanicWorkshop.services');
const { getWinches } = require('../winch/winch.services');
const { resizeImage, uploadSingleFile } = require('../../utils/fileUpload');
const { createSign, getSigns } = require('../Sign/sign.services');
const { getDrivers } = require('./driver.services');
const { validateUpdateProfile } = require('./driver.validator');

const router = require('express').Router();

///////////////////////  MaintenceCenter  ///////////////////////
router
  .route('/maintenanceCenter')
  .post(maintenanceValidation, authinticate, allowedTo('admin'), createMaintenanceCenter)
  .get(authinticate, allowedTo('admin'), getMaintenanceCenters);
router
  .route('/maintenanceCenter/:id')
  .put(maintenanceValidation, authinticate, allowedTo('admin'), updateMaintenanceCenter)
  .delete(authinticate, allowedTo('admin'), deleteMaintenanceCenter);

///////////////////////  GasStation  ///////////////////////
router
  .route('/gasStation')
  .post(authinticate, allowedTo('admin'), createGasStation)
  .get(authinticate, allowedTo('admin'), getGasStations);
router
  .route('/gasStation/:id')
  .put(authinticate, allowedTo('admin'), updateGasStation)
  .delete(authinticate, allowedTo('admin'), deleteGasStation);

///////////////////////  Mechanic  ///////////////////////
router.get('/mechanic', authinticate, allowedTo('admin'), getMechanicWorkshops);

///////////////////////  allUsers  ///////////////////////
router.get('/user', authinticate, allowedTo('admin'), getUsers);

///////////////////////  Winch  ///////////////////////
router.get('/winch', authinticate, allowedTo('admin'), getWinches);

///////////////////////  Driver  ///////////////////////
router.get('/driver', authinticate, allowedTo('admin'), getDrivers);

///////////////////////  Signs  ///////////////////////
router.route('/sign').post(authinticate, allowedTo('admin'), uploadSingleFile('image'), resizeImage, createSign).get(authinticate, allowedTo('admin'), getSigns);

///////////////////////  Admin  ///////////////////////
router.route('/').post(authinticate, allowedTo('admin'), addAdmin).get(authinticate, allowedTo('admin'), getUsers);
router.route('/getProfile').get(authinticate, allowedTo('admin'), getProfile);
router.route('/updateProfile').patch(validateUpdateProfile, authinticate, allowedTo('admin'), updateProfile);
router.get('/admins', authinticate, allowedTo('admin'), getAdmins);
router.get('/verify/:token', emailVerify);
router.route('/userStatistics').get(authinticate, allowedTo('admin'), userStatistics);
router.get('/genderAnalytics', authinticate, allowedTo('admin'), getGenderAnalytic);
router.get('/topModelsHadIssues', authinticate, allowedTo('admin'), tenModelsHadIssues);
router.get('/seasonsAnalytics', authinticate, allowedTo('admin'), getSeasonsAnalytics);
router.route("/cbr").post(authinticate, allowedTo('admin'), caseValidation, createCase);
router.route("/question").post(authinticate, allowedTo('admin'), questionValidation, createQuestion)
router.get('/roadsAnalytics', authinticate, allowedTo('admin'), getTopRoadsHadIssue);
router.get('/:id', authinticate, allowedTo('admin'), getUser);

module.exports = router;
