const {
  getNearestWinch,
  createWinch,
  reportWinch,
  rateWinch,
  getWinch,
  getWinches,
  updateWinchAvailableState,
} = require('./winch.services');
const { signup, emailVerify, authinticate } = require('./winch.auth');
const { allowedTo } = require('../Handlers/auth.factory');
const {winchValidation,validateLatandLon} = require('./winch.validator');
const router = require('express').Router();
const requestRoutes = require('../request/request.api');
const chatRoute = require('../chat/chat.api');

router.use('/request', authinticate, allowedTo('winch'), requestRoutes);
router.use('/chat', authinticate, allowedTo('winch'), chatRoute);
router.post('/signup', winchValidation, signup, createWinch);
router.get('/verify/:token', emailVerify);
router.get('/getNearestWinch', validateLatandLon,getNearestWinch);
router.patch('/updateAvailableState', authinticate, allowedTo('winch'), updateWinchAvailableState);
router.patch('/report/:id', reportWinch);
router.patch('/rate/:id', rateWinch);
router.get('/', getWinches);

module.exports = router;
