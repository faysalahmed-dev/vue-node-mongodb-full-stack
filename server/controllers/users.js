const _ = require('lodash');
const User = require('../models/users');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');
const httpError = require('http-errors');

exports.getUsers = catchError(async (req, res) => {
    const users = await User.find({});
    sendResponse(res, 200, { data: users });
});

exports.authUser = catchError(async (req, res, next) => {
    if (!req.user) return next(httpError(422, 'user no longer exits. please login again'));
    sendResponse(res, 200, { data: req.user });
});

exports.signup = catchError(async (req, res, next) => {
    const hasUser = await User.findOne({ email: req.body.email.toLowerCase() });
    if (hasUser) return next(httpError(403, 'user already exits'));

    const userData = _.pick(req.body, ['name', 'username', 'email', 'password']);
    userData.avatar = `avatar/avatar-default.png`;
    const user = await User.create(userData);
    sendResponse(res, 201, { data: user, token: user.genToken() });
});

exports.login = catchError(async (req, res, next) => {
    const { email, password } = req.body;
    // find the user by email address
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    // if no user found
    if (!user) return next(httpError(403, 'no user found'));

    // if user found check password is match
    const isMatch = await User.comparePassword(password, user.password);
    // if password is match return user data with token
    if (isMatch) return sendResponse(res, 200, { data: user, token: user.genToken() });
    // else user password not match send error message
    return sendResponse(res, 401, { message: 'invalid eamil and password' });
});

exports.logout = (req, res) => {
    req.logout();
    sendResponse(res, 200, { message: 'logout successfuly' });
};
