const passpost = require('passport');
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

exports.signup = (req, res, next) => {
    passpost.authenticate('sign-up', (err, user) => {
        if (err) return next(err);
        req.login(user, err => {
            if (err) return next(err);

            sendResponse(res, 201, { data: user });
        });
    })(req, res, next);
};

exports.login = (req, res, next) => {
    passpost.authenticate('login', (err, user) => {
        if (err) return next(err);
        req.login(user, err => {
            if (err) return next(err);
            sendResponse(res, 200, { data: user });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    sendResponse(res, 200, { message: 'logout successfuly' });
};
