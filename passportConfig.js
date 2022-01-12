const bcrypt = require('bcrypt');
const modelUser = require('./models/User.js');
const LocalStrategy = require('passport-local').Strategy;

function initial(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = modelUser.findByEmail(email.toLowerCase());
        if (user === null || user === undefined) {
            return done(null, false, {msg: 'Such user is not defined in database'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            else {
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
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        return done(null, modelUser.findById(id));
    })

}

module.exports = initial;