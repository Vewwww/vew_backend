const {
  getNearestWinch,
  createWinch,
  reportWinch,
  rateWinch,
  getWinch,
  getWinches,
  updateWinchAvailableState,
  updateWinch,
} = require('./winch.services');
const { signup, emailVerify, authinticate, changePassword } = require('./winch.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const { winchValidation, validateLatandLon } = require('./winch.validator');
const router = require('express').Router();
const { endRequest, acceptWinchRequest, getWinchUpcomingRequests, getWinchAcceptedRequests, rejectRequest } = require('../request/request.services');
const { getUserChats } = require('../chat/chat.services');

router.post('/signup', winchValidation, signup, createWinch);
router.get('/verify/:token', emailVerify);
router.get('/getWinchProfile', authinticate, allowedTo('winch'), getWinch);
router.patch('/updateWinchProfile', authinticate, allowedTo('winch'), updateWinch);
router.patch('/changePassword', authinticate, allowedTo('winch'), changePassword);
router.patch('/updateAvailableState', authinticate, allowedTo('winch'), updateWinchAvailableState);

/////////////////////////   Chat    ////////////////////////////
router.get('/chat', authinticate, allowedTo('winch'), getUserChats);

//////////////////    Request    ///////////////////
router.get('/acceptWinchRequest/:id',authinticate, allowedTo('winch'),acceptWinchRequest);
router.get('/getWinchUpcomingRequests',authinticate, allowedTo('winch'),getWinchUpcomingRequests);
router.get('/getWinchAcceptedRequests',authinticate, allowedTo('winch'),getWinchAcceptedRequests);
router.get('/endRequest/:id',authinticate,allowedTo('winch'), endRequest);
router.delete('/request/:id',authinticate,allowedTo('winch'), rejectRequest);

module.exports = router;
