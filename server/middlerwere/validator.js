const { checkSchema, validationResult } = require('express-validator');
const httpError = require('http-errors');
const _ = require('lodash');
const scheams = require('../utils/validatorSchemas');

exports.signupValidator = checkSchema({
    name: scheams.name,
    email: scheams.email,
    username: scheams.username,
    password: scheams.password
});

exports.loginValidator = checkSchema({
    email: scheams.email,
    password: scheams.password
});

exports.createMeetupValidator = checkSchema({
    title: scheams.title,
    'location.country': scheams.location.country,
    'location.address': scheams.location.address,
    'location.city': scheams.location.city,
    'location.isoCode': scheams.location.isoCode,
    startDate: scheams.startDate,
    timeFrom: scheams.timeFrom,
    timeTo: scheams.timeTo,
    category: scheams.category,
    shortInfo: scheams.shortInfo,
    descriptions: scheams.descriptions
});

exports.transformMeetupCreateBody = (req, res, next) => {
    if (!req.body.data) return next(httpError(400, 'please provied required field'));
    if (!req.files || !Array.isArray(req.files) || req.files.length < 1) {
        return next(httpError(400, 'please provied atlest 1 meetup image'));
    }
    if (req.files.length > 5) return next(httpError(400, 'max 5 image are allowed'));
    if (typeof req.body.data === 'string') {
        req.body = JSON.parse(req.body.data);
    } else {
        req.body = req.body.data;
    }
    next();
};

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
