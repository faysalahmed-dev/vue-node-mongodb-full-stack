const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const httpError = require('http-errors');
const _ = require('lodash');

const signupUser = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            // check user is already exits
            const user = await User.findOne({ email: email.toLowerCase() });
            if (user) return done(httpError(403, 'user already exits'));

            // if no user found with this email create new user
            const userData = _.pick(req.body, ['name', 'username', 'email', 'password']);
            const newUser = await User.create(userData);
            done(null, newUser);
        } catch (err) {
            done(err);
        }
    }
);

const loginUser = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            // find the user by email address
            const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
            // if no user found
            if (!user) return done(httpError(403, 'no user found'));

            // if user found check password match
            const isMatch = await User.comparePassword(password, user.password);

            if (isMatch) {
                return done(null, user);
            }
            done(httpError(401, 'invalid email and password'));
        } catch (err) {
            done(err);
        }
    }
);

module.exports = passport => {
    passport.use('sign-up', signupUser);
    passport.use('login', loginUser);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
