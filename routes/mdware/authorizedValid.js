const {body} = require('express-validator');
// const checkYesLogin = require('./mdware/checkYesLogin');

module.exports = {
    // loginValid: body('email').isEmail()
    loginValid: [
        body('email').notEmpty().withMessage('Не может быть E-mail').isEmail().withMessage('Неверный email'),
        body('password').notEmpty().withMessage('Неверный пароль').isLength({min: 6}).withMessage('Минимальная длина пароля 6 символов')
    ],
    registerValid: [
        body('name').notEmpty().isLength({min: 1}),
        body('lastname').notEmpty().isLength({min: 1}),
        body('email').notEmpty().withMessage('Это не email').isEmail().withMessage('Неверный email'),
        body('password').notEmpty().withMessage('Не может быть паролем').isLength({min: 6}).withMessage('Минимальная длина пароля: 6 символов')
    ]
}