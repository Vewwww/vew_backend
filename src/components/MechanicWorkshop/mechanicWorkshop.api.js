const {
  getNearestMechanicWorkshop,
  createMechanicWorkshop,
  getMechanicWorkshops,
  updateMechanicWorkshop,
  getMechanicWorkshop,
} = require('./mechanicWorkshop.services');
const { signup, emailVerify, authinticate, changePassword, updateProfile } = require('./mechanicWorkshop.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const { mechanicValidation, validateLatandLon } = require('./mechanicWorkshop.validator');
const router = require('express').Router();
const {
  endRequest,
  acceptMechanicRequest,
  getMechanicUpcomingRequests,
  geteMchanicAcceptedRequests,
  rejectRequest,
} = require('../request/request.services');
const { getUserChats } = require('../chat/chat.services');

// router.use('/:mechanitId/request', requestRoute);
router.post('/signup', mechanicValidation, signup, createMechanicWorkshop);
router.get('/verify/:token', emailVerify);
router.patch('/changePassword', authinticate, allowedTo('mechanic'), changePassword);
router.get('/getMechanicProfile', authinticate, allowedTo('mechanic'), getMechanicWorkshop);
router.patch('/updateMechanicProfile', authinticate, allowedTo('mechanic'), updateProfile);

/////////////////////////   Chat    ////////////////////////////
router.get('/chat', authinticate, allowedTo('mechanic'), getUserChats);

//////////////////    Request    ///////////////////
router.get('/acceptMechanicRequest/:id', authinticate, allowedTo('mechanic'), acceptMechanicRequest);
router.get('/getMechanicUpcomingRequests', authinticate, allowedTo('mechanic'), getMechanicUpcomingRequests);
router.get('/geteMchanicAcceptedRequests', authinticate, allowedTo('mechanic'), geteMchanicAcceptedRequests);
router.get('/endRequest/:id', authinticate, endRequest);
router.delete('/request/:id',authinticate,allowedTo('mechanic'), rejectRequest);


module.exports = router;
