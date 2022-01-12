const multer = require('multer');
// const postModel = require('../../models/Post');

const storageConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/dbimg');
    },
    filename: function(req, file, cb) {
        cb(null, req.uuId + '.jpg');
    }
});

// fileUpload = multer({des: StorageEngine});

module.exports = fileUpload = multer({storage: storageConfig});