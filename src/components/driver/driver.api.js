const { signup, emailVerify, changePassword, authinticate } = require('./driver.auth');
const { createUser, updateUser, reportDriver, search ,getDrivers,getNearest} = require('./driver.services');
const { allowedTo } = require('../Handlers/auth.factory');
const {driverValidation,validateLatandLon} = require('./driver.validator');
const {getNotifications} = require("../notification/notification.services")
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
router.route('/getNotifications').get(authinticate, allowedTo('user'), getNotifications)
router.patch('/changePassword/:id', authinticate, allowedTo('user'), changePassword);
router.get('/search',validateLatandLon, authinticate, allowedTo('user'), search);
router.get('/getNearest',validateLatandLon, authinticate, allowedTo('user'), getNearest);
router.post('/signup', driverValidation, signup, createUser);
router.get('/verify/:token', emailVerify);
router.patch('/report/:id', reportDriver);
router.put("/:id",authinticate, allowedTo('user'), updateUser)
module.exports = router;
