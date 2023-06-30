const {
  getNearestMechanicWorkshop,
  createMechanicWorkshop,
  getMechanicWorkshops,
} = require('./mechanicWorkshop.services');
const { signup, emailVerify, authinticate, changePassword } = require('./mechanicWorkshop.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const { mechanicValidation, validateLatandLon } = require('./mechanicWorkshop.validator');
const router = require('express').Router();
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
router.get('/getMechanicProfile', authinticate, allowedTo('mechanic'), getMechanicWorkshops);
router.patch('/updateMechanicProfile', authinticate, allowedTo('mechanic'), updateMechanicWorkshop);

/////////////////////////   Chat    ////////////////////////////
router.get('/chat', authinticate, allowedTo('mechanic'), getUserChats);

//////////////////    Request    ///////////////////
router.get('/acceptMechanicRequest/:id', authinticate, allowedTo('mechanic'), acceptMechanicRequest);
router.get('/getMechanicUpcomingRequests', authinticate, allowedTo('mechanic'), getMechanicUpcomingRequests);
router.get('/geteMchanicAcceptedRequests', authinticate, allowedTo('mechanic'), geteMchanicAcceptedRequests);
router.get('/endRequest/:id', authinticate, endRequest);

module.exports = router;
