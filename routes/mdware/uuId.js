const {v4: uuidv4} = require('uuid');

module.exports = (req, res, next) => {
    req.uuId = uuidv4();
    next();
}