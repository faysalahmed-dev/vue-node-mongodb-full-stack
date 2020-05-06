const catchError = require('../utils/catchError');
const isJWT = require('validator/lib/isJWT');
const httpError = require('http-errors');
const User = require('../models/users');

exports.isAuthenticated = catchError(async (req, res, next) => {
    let token;
    const tokenHeader = req.header('authorization');

    if (tokenHeader && tokenHeader.startsWith('Bearer ') && isJWT(tokenHeader.replace('Bearer '))) {
        token = tokenHeader.replace('Bearer ', '');
    } else {
        return next(httpError(401, 'Access denied'));
    }

    // verify the token
    const { iat, id } = await User.verifyToken(token);

    // check user is exits
    const currentUser = await User.findById(id).select('+password');

    if (!currentUser) {
        return next(httpError(404, 'no user found or exites'));
    }

    // check after token is issued password is changed
    if (currentUser.passwordIsChange(iat)) {
        return next(httpError(401, 'User Recently Change Password Please Login Again'));
    }

    req.user = currentUser;
    next();
});
