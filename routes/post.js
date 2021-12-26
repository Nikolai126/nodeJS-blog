const express = require('express');
const uuId = require('./mdware/uuId');

const postController = require('../controllers/postController');

const postValidate = require('./mdware/postValidate');
const checkYesLogin = require('./mdware/checkYesLogin');
const checkNoLogin = require('./mdware/checkNoLogin');
const fileUpload = require('./mdware/fileUpload');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/create', checkYesLogin, postController.createPage);
router.get('/:id', postController.getPost);
router.get('/:tag', postController.getPostByTag)

router.post('/', checkYesLogin, uuId, fileUpload.single('image'), postValidate, postController.createNewPost);

// router.get('/:id/create', postController.getPost, checkYesLogin, postController.createPage);
// router.get('/:tag/create', postController.getPostByTag, checkYesLogin, postController.createPage);

module.exports = router;