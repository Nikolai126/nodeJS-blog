const {body} = require('express-validator');
// const checkYesLogin = require('./mdware/checkYesLogin');

module.exports = {
    // loginValid: body('email').isEmail()
    loginValid: [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isLength({min: 5}).withMessage('It is wrong password')
    ],
    registerValid: [
        body('name').notEmpty().isLength({min: 1}),
        body('lastname').notEmpty().isLength({min: 1}),
        body('email').notEmpty().withMessage('Not empty email').isEmail().withMessage('It is unvailable email'),
        body('password').notEmpty().withMessage('Not empty password').isLength({min: 5}).withMessage('Minimum password length 5 characters')
    ]
}