const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const passport = require('passport');
const flashMsg = require('express-flash-messages')
// const flashMsg = require('express-flash-messages');

// mongoose.connect(keys.mongoURI)
//     .then(() => {
//         console.log('MongoDB connected!')
//     })
//     .catch(err => console.error(err))

const initial = require('./passportConfig.js');
initial(passport);

const app = express();


const router = require('./router');


const port = process.env.port || 5000;
const secretSession = 'secret';

app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null
    }
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();

});

app.use(passport.initialize());
console.log('init Passport');

app.use(passport.session());
app.use(flashMsg());

app.use('/', router);


// app.get('/', (req, res) => {
//     res.render('main', {
//         title: 'New post'
//     })
// })

// app.use('/api/post', postRouter);
// app.use(express.static(mainPath));



app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
