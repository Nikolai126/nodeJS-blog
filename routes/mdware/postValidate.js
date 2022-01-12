const {body} = require('express-validator');

module.exports = [
    body('title').notEmpty().isLength({min: 3}).withMessage('Минимальная длина поля с названием: 3 символа'),
    body('description').notEmpty().isLength({min: 50}).withMessage('Минимальная длина поля с описанием: 50 символов')
]