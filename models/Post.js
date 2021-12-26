// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const postSchema = new Schema({
//     photo: {
//         type: String
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     tag: {
//         type: String
//     },
//     author: {
//         type: String,
//         required: true
//     },
//     authorId:
//     date: {
//         type: Date,
//         default: dateExist
//     }

// })

// module.exports = mongoose.model('posts', postSchema);

const dbPosts = `${__dirname}/../DataBase/posts.json`;
const modelUser = require('./User');
const fs = require('fs');
const mongoose = require('mongoose');

class modelPost {
    constructor(link) {
        this.postLink = link;
    }

    allData() {
        const data = JSON.parse(fs.readFileSync(this.postLink));
        return data
    }

    filterByTag(array, tag) {
        return array.filter(post => post.tags.some(thisTag => thisTag === tag));
    }

    findById(id) {
        const { data } = this.allData();
        const post = data.find((post) => post.id === id);
        if(post) {
            return post
        }
        else {
            console.log('This post is not added!');
        }
    }

    NewPost(postData, file, user, uuId) {
        function dateExist() {
            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
              ];
            const date = new Date();
            const nowDay = date.getDay();
        
            return days[nowDay];
        }

        const thisUser = modelUser.findById(user.id);
        const { data } = this.allData();
        const newPost = {
            id: uuId,
            title: postData.title,
            description: postData.description,
            tags: [...postData.tags.split(',')],
            imageExists: file,
            author: thisUser.name,
            authorId: thisUser.id,
            date: dateExist()
        }

        data.push(newPost);
        const updatePosts = JSON.stringify({data});

        fs.writeFile(this.postLink, updatePosts, (e) => {
            if(e) {
                console.log(e);
            }
            console.log('Post pushed in dataBase successfull!');
        });
    }
}

module.exports = new modelPost(dbPosts);