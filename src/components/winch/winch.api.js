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
const requestRoutes = require('../request/request.api');
const chatRoute = require('../chat/chat.api');

router.use('/request', authinticate, allowedTo('winch'), requestRoutes);
router.use('/chat', authinticate, allowedTo('winch'), chatRoute);
router.post('/signup', winchValidation, signup, createWinch);
router.get('/verify/:token', emailVerify);
router.get('/getWinchProfile', authinticate, allowedTo('winch'), getWinch);
router.patch('/updateWinchProfile', authinticate, allowedTo('winch'), updateWinch);

router.patch('/changePassword', authinticate, allowedTo('winch'), changePassword);
router.get('/getNearestWinch', validateLatandLon, getNearestWinch);
router.patch('/updateAvailableState', authinticate, allowedTo('winch'), updateWinchAvailableState);



module.exports = router;
