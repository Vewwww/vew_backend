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

const router = require('express').Router();
router.route('/').post(authinticate, allowedTo('admin'), addAdmin);
router.route('/userStatistics').get(authinticate, allowedTo('admin'), userStatistics);
router.get('/genderAnalytics', authinticate, allowedTo('admin'), getGenderAnalytic);
router.get('/topModelsHadIssues', authinticate, allowedTo('admin'), tenModelsHadIssues);
router.get('/seasonsAnalytics', authinticate, allowedTo('admin'), getSeasonsAnalytics);
router.route('/').get(authinticate, allowedTo('admin'), getUsers);
router.route('/:id').get(authinticate, allowedTo('admin'), getUser);
module.exports = router;
