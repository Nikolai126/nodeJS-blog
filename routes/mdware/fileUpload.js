const multer = require('multer');
// const postModel = require('../../models/Post');

const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img');
    },
    filename: function(req, file, cb) {
        cb(null, req.uuId + '.jpg');
    }
});

// fileUpload = multer({des: fileStorageEngine});

module.exports = fileUpload = multer({storage: fileStorageEngine});