const User = require('../models/users');
const httpError = require('http-errors');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (user) return done(null, user);
                done(httpError(401, 'access denided'));
            } catch (err) {
                done(err);
            }
        })
    );
};
