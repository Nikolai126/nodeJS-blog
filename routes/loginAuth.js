const express = require('express');
const passport = require('passport');

const loginController = require('../controllers/loginController');

const checkYesLogin = require('./mdware/checkYesLogin');
const checkNoLogin = require('./mdware/checkNoLogin');


const {loginValid, registerValid} = require('./mdware/authorizedValid');

const router = express.Router();



router.get('/registration', checkNoLogin, loginController.registrPage);
router.post('/registration', checkNoLogin, registerValid, loginController.createNewUser);
router.get('/login', checkNoLogin, loginController.loginPage);
router.post('/loginAuth/login', checkNoLogin, loginValid, loginController.loginValidMessage, passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/loginAuth/login',
    failureFlash: true
}));

router.post('/logout', checkYesLogin, loginController.SessOut);

module.exports = router;