const {
  getNearestMechanicWorkshop,
  createMechanicWorkshop,
  reportMechanic,
  rateMechanic,
  getMechanicWorkshops,
} = require('./mechanicWorkshop.services');
const { signup, emailVerify, authinticate, changePassword } = require('./mechanicWorkshop.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const { mechanicValidation, validateLatandLon } = require('./mechanicWorkshop.validator');
const requestRoutes = require('../request/request.api');
const router = require('express').Router();
const chatRoute = require('../chat/chat.api');
const {
  endRequest,
  acceptMechanicRequest,
  getMechanicUpcomingRequests,
  geteMchanicAcceptedRequests,
} = require('../request/request.services');
const { getUserChats } = require('../chat/chat.services');

// router.use('/:mechanitId/request', requestRoute);
router.post('/signup', mechanicValidation, signup, createMechanicWorkshop);
router.get('/getNearestMechanicWorkshop', validateLatandLon, getNearestMechanicWorkshop);
router.get('/verify/:token', emailVerify);
router.patch('/changePassword', authinticate, allowedTo('mechanic'), changePassword);

/////////////////////////   Chat    ////////////////////////////
router.get('/chat', authinticate, allowedTo('mechanic'), getUserChats);

//////////////////    Request    ///////////////////
router.get('/acceptMechanicRequest/:id', authinticate, allowedTo('mechanic'), acceptMechanicRequest);
router.get('/getMechanicUpcomingRequests', authinticate, allowedTo('mechanic'), getMechanicUpcomingRequests);
router.get('/geteMchanicAcceptedRequests', authinticate, allowedTo('mechanic'), geteMchanicAcceptedRequests);
router.get('/endRequest/:id', authinticate, endRequest);

module.exports = router;
