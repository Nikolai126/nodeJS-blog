const modelPost = require('../models/Post');
// const { filterByTag } = require('../models/Post');
const {validationResult} = require('express-validator');

const mongoose = require('mongoose');


// mongoose.connect(keys.mongoURI)
//     .then(() => {
//         console.log('MongoDB connected!')
//     })
//     .catch(err => console.error(err))




class PostController {
    async getAllPosts(req, res) {
        const allPosts = modelPost.allData();
        const posts = allPosts.data;
        console.log('postcontroller - yes');
        res.render('index', {posts, name: req.user?.name, email: req?.user?.email});
        //const modal = M.Modal.init(document.querySelector('.modal'));
        // await res.render('index', {posts: true, name: req.user.name, email: req.user.email});
        // try {
            
        // }
        // catch (err) {
        //     res.render('index', {posts, name: false, email: 'There is no email'})

        // }

    }

    getPostByTag(req, res) {
        const tag = req.params.tag;
        const page = req.query.page || 1;
        const limit = req.query.limit || 3;
        const allPosts = modelPost.allData();
        const filterPostByTag = modelPost.filterByTag(allPosts.data, tag);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const posts = filterPostByTag.slice(startIndex, endIndex);
        try {
            res.render('index', {posts, name: req.user.name, email: req.user.email});
        }
        catch (err) {
            res.render('index', {posts, name: false, email: 'There is no email'})

        }
    }

    getPost(req, res) {
        const userId = req.params.id;
        const onePost = modelPost.findById(userId);
        try {
            res.render('post', {post: onePost, name: req.user.name, email: req.user.email})
        }
        catch(err) {
            res.render('post', {post: onePost, name: false, email: 'There is no email'})
        }
    }

    createNewPost(req, res) {
        const postData = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/index/create')
        }
        modelPost.NewPost(postData, req.file, req.user, req.uuId);
        res.redirect('/index')
    }

    createPage(req, res) {
        res.render('create', {name: req.user.name, email: req.user.email});
    
    }
}


module.exports = new PostController();