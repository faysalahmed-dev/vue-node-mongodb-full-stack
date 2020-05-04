const { checkSchema, validationResult } = require('express-validator');
const httpError = require('http-errors');
const _ = require('lodash');
const scheams = require('../utils/validatorSchemas');

exports.signupValidator = checkSchema({
    name: scheams.name,
    email: scheams.email,
    username: scheams.username,
    password: scheams.password,
    confirmPassword: scheams.confirmPassword
});

exports.loginValidator = checkSchema({
    email: scheams.email,
    password: scheams.password
});

exports.validate = (req, res, next) => {
    const errors = validationResult(req).errors;
    if (errors.length < 1) return next();
    const error = _.transform(
        errors,
        (result, { msg, param }) => {
            if (!result[param]) {
                result[param] = msg;
            }
        },
        {}
    );
    const err = httpError(400, 'please fill the all required fields');
    err.data = error;
    next(err);
};
