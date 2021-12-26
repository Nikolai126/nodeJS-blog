const express = require('express');
const router = express.Router();

const postRouter = require('./routes/post');
const loginRouter = require('./routes/loginAuth');

router.use('/loginAuth', loginRouter);
router.use('/index', postRouter);


router.use('/', (req, res) => {
    res.redirect('/index');
});

module.exports = router;