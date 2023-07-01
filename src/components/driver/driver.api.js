const { signup, emailVerify, changePassword, authinticate } = require('./driver.auth');
const {
  createUser,
  updateUser,
  reportDriver,
  search,
  getDrivers,
  getNearest,
  getProfile,
} = require('./driver.services');
const { allowedTo } = require('../Handlers/auth.factory');
const {
  validateLatandLon,
  ValidationPassword,
  driverValidation,
  validateUpdateProfile,
} = require('./driver.validator');
const { getNotifications } = require('../notification/notification.services');
const { getNearestMaintenanceCenters } = require('../MaintenanceCenter/maintenanceCenter.services');
const { getNearestGasStations } = require('../GasStation/gasStation.services');
const { reportMechanic, rateMechanic, getNearestMechanicWorkshop } = require('../MechanicWorkshop/mechanicWorkshop.services');
const { reportWinch, rateWinch, getNearestWinch } = require('../winch/winch.services');
const { getSigns, getSign } = require('../Sign/sign.services');
const {
  createRequest,
  getDriverPendingRequests,
  getDriverCurrentRequests,
  getPreviousRequests,
} = require('../request/request.services');
const { getUserChats } = require('../chat/chat.services');
const { getCarsOfDriver, updateCar, deleteCar, createCar } = require('../Car/car.services');
const carValidation = require('../Car/car.validator');
const { validateCreateMechanicRequest, validateCreateWinchRequest } = require('../request/request.validator');
const router = require('express').Router();

/////////////////////////   Maintenance Center    ////////////////////////////
router.get(
  '/getNearestMaintenanceCenters',
  validateLatandLon,
  authinticate,
  allowedTo('user'),
  getNearestMaintenanceCenters
);

/////////////////////////   Gas Staion    ////////////////////////////
router.get('/getNearestGasStations', validateLatandLon, authinticate, allowedTo('user'), getNearestGasStations);

/////////////////////////   Mechanic    ////////////////////////////
router.patch('/mechanic/report/:id', authinticate, allowedTo('user'), reportMechanic);
router.patch('/mechanic/rate/:id', authinticate, allowedTo('user'), rateMechanic);
router.get('/getNearestMechanicWorkshop', validateLatandLon, getNearestMechanicWorkshop);

/////////////////////////   Winch    ////////////////////////////
router.patch('/winch/report/:id', authinticate, allowedTo('user'), reportWinch);
router.patch('/winch/rate/:id', authinticate, allowedTo('user'), rateWinch);
router.get('/getNearestWinch', validateLatandLon, getNearestWinch);

/////////////////////////   Signs    ////////////////////////////
router.get('/sign', authinticate, allowedTo('user'), getSigns);
router.get('sign/:id', authinticate, allowedTo('user'), getSign);

/////////////////////////   Request    ////////////////////////////
router.post('/createMechanicRequest', validateCreateMechanicRequest, authinticate, allowedTo('user'), createRequest);
router.post('/createWinchRequest', validateCreateWinchRequest, authinticate, allowedTo('user'), createRequest);
router.get('/request/getDriverPendingRequests', authinticate, allowedTo('user'), getDriverPendingRequests);
router.get('/request/getDriverCurrentRequests', authinticate, allowedTo('user'), getDriverCurrentRequests);
router.get('/request/previousRequests', authinticate, allowedTo('user'), getPreviousRequests);

/////////////////////////   Chat    ////////////////////////////
router.get('/chat', authinticate, allowedTo('user'), getUserChats);

/////////////////////////   Car    ////////////////////////////
router.get('car/carOwner/:driverId', authinticate, allowedTo('user'), getCarsOfDriver);
router.post('car/', carValidation, authinticate, allowedTo('user'), createCar);
router
  .route('car/:id')
  .put(carValidation, authinticate, allowedTo('user'), updateCar)
  .delete(authinticate, allowedTo('user'), deleteCar);

/////////////////////////   Driver    ////////////////////////////
router.put('/', validateUpdateProfile, authinticate, allowedTo('user'), updateUser);
router.route('/getProfile').get(authinticate, allowedTo('user'), getProfile);
router.route('/getNotifications').get(authinticate, allowedTo('user'), getNotifications);
router.patch('/changePassword', ValidationPassword, authinticate, allowedTo('user'), changePassword);
router.get('/search', validateLatandLon, authinticate, allowedTo('user'), search);
router.get('/getNearest', validateLatandLon, authinticate, allowedTo('user'), getNearest);
router.post('/signup', driverValidation, signup, createUser);
router.get('/verify/:token', emailVerify);

module.exports = router;
