const {body} = require('express-validator');

module.exports = [
    body('title')
    .notEmpty(),

    body('description')
    .notEmpty()
    .isLength({min: 10})
]