const Meetup = require('../models/meetups');
const _ = require('lodash');
const countryData = require('../utils/country-data');
const {
    Types: { ObjectId }
} = require('mongoose');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');
const httpError = require('http-errors');

exports.getMeetups = catchError(async (req, res) => {
    const meetup = await Meetup.find({})
        .populate('category')
        .populate('joinedPeople');

    sendResponse(res, 200, { data: meetup });
});

exports.getMeetupById = catchError(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return next(httpError(400, 'invalid meetup id'));
    }

    const meetup = await Meetup.findById(id)
        .populate('meetupCreator', 'name id avatar')
        .populate('category')
        .populate({
            path: 'joinedPeople',
            options: { limit: 5, sort: { username: -1 } }
        });

    if (!meetup) return next(httpError(404, 'meetup not found'));
    sendResponse(res, 200, { data: meetup });
});

exports.createMeetup = catchError(async (req, res) => {
    const meetupFromBody = _.pick(req.body, [
        'title',
        'location',
        'timeFrom',
        'timeTo',
        'category',
        'descriptions',
        'shortInfo',
        'startDate'
    ]);

    meetupFromBody.images = _.map(req.files, 'filename');
    meetupFromBody.location.country = countryData[meetupFromBody.location.isoCode].country;
    meetupFromBody.meetupCreator = req.user.id;

    const meetup = await Meetup.create(meetupFromBody);
    sendResponse(res, 201, { data: meetup });
});
