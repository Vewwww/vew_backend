const { signup, emailVerify, changePassword, authinticate } = require('./driver.auth');
const { createUser, updateUser, reportDriver, search, getDrivers } = require('./driver.services');
const { allowedTo } = require('../Handlers/auth.factory');
const driverValidation = require('./driver.validator');
const maintenanceRoute = require('../MaintenanceCenter/maintenanceCenter.api');
const mechanicRoute = require('../MechanicWorkshop/mechanicWorkshop.api');
const gasStationRoute = require('../GasStation/gasStation.api');
const winchRoute = require("../winch/winch.api");
const requestRoute = require('../request/request.api');
const chatRoute = require('../chat/chat.api');
const carRoute = require('../Car/car.api');
const router = require('express').Router();

router.use('/maintenanceCenter', authinticate, allowedTo('user'), maintenanceRoute);
router.use('/gasStation', authinticate, allowedTo('user'), gasStationRoute);
router.use('/mechanic', authinticate, allowedTo('user'), mechanicRoute);
router.use('/winch', authinticate, allowedTo('user'), winchRoute);
router.use('/request', authinticate, requestRoute);
router.use('/chat', authinticate, allowedTo('user'), chatRoute);
router.use('/car', authinticate, allowedTo('user'), carRoute);

router.route('/').put(authinticate, allowedTo('user'), driverValidation, updateUser).get(getDrivers);
router.patch('/changePassword/:id', authinticate, allowedTo('user'), changePassword);
router.patch('/search', authinticate, allowedTo('user'), search);
router.post('/signup', driverValidation, signup, createUser);
router.get('/verify/:token', emailVerify);
router.patch('/report/:id', reportDriver);

module.exports = router;
