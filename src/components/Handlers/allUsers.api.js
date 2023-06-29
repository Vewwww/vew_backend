const authFactory = require('./auth.factory');
const { validateLogin } = require('./allUsers.validator');

const router = require('express').Router();
router.post('/login', validateLogin, authFactory.login);
router.get('/logout', authFactory.logout);
router.post('/forgetPassword', authFactory.forgetPassword);
router.get('/verifyPassword/:token', authFactory.verifyPassword);
router.post('/resetPassword', authFactory.resetPassword);
module.exports = router;
