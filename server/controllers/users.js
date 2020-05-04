const passpost = require('passport');
const User = require('../models/users');
const catchError = require('../utils/catchError');

exports.getUsers = catchError(async (req, res) => {
    console.log(req.headers);
    const user = await User.find({});
    res.json(user);
});

exports.signup = (req, res, next) => {
    passpost.authenticate('sign-up', (err, user) => {
        if (err) return next(err);
        req.login(user, err => {
            if (err) return next(err);
            res.status(201).json({ user });
        });
    })(req, res, next);
};

exports.login = (req, res, next) => {
    passpost.authenticate('login', (err, user) => {
        if (err) return next(err);
        req.login(user, err => {
            if (err) return next(err);
            res.status(200).json({ user });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'logout successfuly' });
};
