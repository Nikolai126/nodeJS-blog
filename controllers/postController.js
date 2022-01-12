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
        const page = req.query.page || 1;
        const limit = 8;
        const allPosts = modelPost.allData();
        const start = (page - 1) * limit;
        const end = page * limit;
        const posts = allPosts.data.slice(start, end);
        await res.render('index', {posts,  pagination: { page, limit, totalRows: allPosts.data.length, queryParams: {limit: 3} }, name: req.user?.name, email: req?.user?.email});
    }

    getPostByTag(req, res) {
        const tag = req.params.tag;
        const page = req.query.page || 1;
        const limit = 8;
        const allPosts = modelPost.allData();
        const filterPostByTag = modelPost.filterByTag(allPosts.data, tag);
        const start = (page - 1) * limit;
        const end = page * limit;
        const posts = filterPostByTag.slice(start, end);
        try {
            res.render('index', {posts, pagination: { page, limit, totalRows: allPosts.data.length, queryParams: {limit: 3} }, name: req.user.name, email: req.user.email});
        }
        catch (err) {
            res.render('index', {posts, pagination: { page, limit, totalRows: allPosts.data.length, queryParams: {limit: 3} }, name: false, email: 'There is no email'})

        }
    }

    getPost(req, res) {
        const userId = req.params.id;
        const onePost = modelPost.findById(userId);
        try {
            res.render('post', {post: onePost, name: req?.user?.name, email: req?.user?.email})
        }
        catch(err) {
            res.render('post', {post: onePost, name: false, email: 'There is no email'})
        }
    }

    createNewPost(req, res) {
        console.log('CreateNewPost beginning');
        const postData = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            console.log('Bad post((');
            return res.redirect('/index/new');
        }
        modelPost.NewPost(postData, req?.file, req?.user, req?.uuId);
        res.redirect('/index');
    }

    createPage(req, res) {
        res.render('create', {name: req?.user?.name, email: req?.user?.email});
    }
}


module.exports = new PostController();