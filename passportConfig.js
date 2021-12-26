const bcrypt = require('bcrypt');
const modelUser = require('./models/User.js');
const LocalStrategy = require('passport-local').Strategy;

function initial(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = modelUser.findByEmail(email.toLowerCase());
        console.log('authUser is going');
        if (user === null) {
            console.log('User is null');
            return done(null, false, {msg: 'Such user is not defined in database'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('User is here');
                return done(null, user)
            }
            else {
                console.log('Password is incorrect');
                return done(null, false, {msg: 'This password is incorrect'})
            }
        }
        catch(err) {
            console.log('error PassportConfig');
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => {
        console.log('serializeUser yes');
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        return done(null, modelUser.findById(id));
    })

}

module.exports = initial;