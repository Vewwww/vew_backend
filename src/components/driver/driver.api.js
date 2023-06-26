const { signup, emailVerify, changePassword, authinticate } = require('./driver.auth');
const { createUser, updateUser, reportDriver, search ,getNearest} = require('./driver.services');
const { allowedTo } = require('../Handlers/auth.factory');
const {driverValidation,driverValidateLocation} = require('./driver.validator');
const maintenanceRoute = require('../MaintenanceCenter/maintenanceCenter.api');
const mechanicRoute = require('../MechanicWorkshop/mechanicWorkshop.api');
const gasStationRoute = require('../GasStation/gasStation.api');
const winchRoute = require("../winch/winch.api");
const requestRoute = require('../request/request.api');
const chatRoute = require('../chat/chat.api');
const carRoute = require('../Car/car.api');
const router = require('express').Router();

router.use('/maintenanceCenter',driverValidateLocation, authinticate, allowedTo('user'), maintenanceRoute);
router.use('/gasStation', driverValidateLocation, authinticate, allowedTo('user'), gasStationRoute);
router.use('/mechanic', driverValidateLocation, authinticate, allowedTo('user'), mechanicRoute);
router.use('/winch', driverValidateLocation, authinticate, allowedTo('user'), winchRoute);
router.use('/request', authinticate, requestRoute);
router.use('/chat', authinticate, allowedTo('user'), chatRoute);
router.use('/car', authinticate, allowedTo('user'), carRoute);

router.route('/').put(authinticate, allowedTo('user'), driverValidation, updateUser);
router.patch('/changePassword/:id', authinticate, allowedTo('user'), changePassword);
router.get('/search',driverValidateLocation, authinticate, allowedTo('user'), search);
router.get('/getNearest',driverValidateLocation, authinticate, allowedTo('user'), getNearest);
router.post('/signup', driverValidation, signup, createUser);
router.get('/verify/:token', emailVerify);
router.patch('/report/:id', reportDriver);
module.exports = router;
