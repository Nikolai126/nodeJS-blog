const modelUser = require('../models/User');
const {validationResult} = require('express-validator');
// const mongoose = require('mongoose');

class loginController {
    registrPage(req, res) {
        res.render('registration');
    }

    loginValidMessage(req, res, next) {
        const errorValid = validationResult(req);
        if(!errorValid.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errorValid.array()[0].msg)
            }
            return res.redirect('/loginAuth/login');
        }
        next();
    }


    loginPage(req, res) {
        const flashMsg = res.locals.getMessages();
        console.log('flashMsg', flashMsg);
        if(flashMsg.error) {
            res.render('login', {
                showError: true,
                errors: flashMsg.error
            })
        }
        else {
            res.render('login')
        }
    }

    createNewUser(req, res) {
        const userData = req.body;
        const errorValid = validationResult(req);
        if (!errorValid.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errorValid.array()[0].msg)
            }
            return res.redirect('/loginAuth/registration')
        }
        const user = modelUser.NewUser(userData);
        if (user) {
            res.redirect('/loginAuth/login')
        }
        else {
            res.redirect('/loginAuth/registration')
        }
    }

    SessOut(req, res) {
        req.logOut();
        res.redirect('/index');
    }
}

module.exports = new loginController();