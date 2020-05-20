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
        .populate('joinedPeople', 'id name');

    sendResponse(res, 200, { data: meetup });
});

exports.getMeetupBySlug = catchError(async (req, res, next) => {
    const { slug } = req.params;
    if (!slug) {
        return next(httpError(400, 'invalid meetup slug'));
    }

    const meetup = await Meetup.findOne({ slug })
        .populate('meetupCreator', 'name id avatar')
        .populate('category')
        .populate({
            path: 'joinedPeople',
            options: { limit: 5, select: 'id name avatar' }
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

    meetupFromBody.images = _.map(req.files, ({ filename }) => `meetups/${filename}`);
    meetupFromBody.location.country = countryData[meetupFromBody.location.isoCode].country;
    meetupFromBody.meetupCreator = req.user.id;

    const meetup = await Meetup.create(meetupFromBody);
    sendResponse(res, 201, { data: meetup });
});

exports.joinMeetup = catchError(async (req, res, next) => {
    const { meetupId } = req.params;
    // meetup id is valid
    if (!ObjectId.isValid(meetupId)) {
        return next(httpError(400, 'invalid meetup id'));
    }
    const meetup = await Meetup.findOne({ _id: meetupId });
    // check meetup is exits
    if (!meetup) return next(httpError(400, 'meet up not found'));
    // user is owner of meetup
    if (meetup.meetupCreator.toHexString() === req.user.id) {
        return next(httpError(403, 'can not join own meetup'));
    }

    // check user is already join the meetup
    // to havy when array is larger
    if (meetup.joinedPeople.includes(req.user.id)) {
        return next(httpError(403, 'user already joined meetup'));
    }
    meetup.joinedPeopleCount++;
    meetup.joinedPeople.push(req.user.id);
    req.user.joinedMeetups.push(meetup.id);

    await Promise.all([meetup.save(), req.user.save()]);
    sendResponse(res, 200, {
        data: { message: `successfully joined in "${meetup.title}" meetup` }
    });
});

exports.leaveMeetup = catchError(async (req, res, next) => {
    const { meetupId } = req.params;
    // meetup id is valid
    if (!ObjectId.isValid(meetupId)) {
        return next(httpError(400, 'invalid meetup id'));
    }
    const meetup = await Meetup.findOne({ _id: meetupId });
    // check meetup is exits
    if (!meetup) return next(httpError(400, 'meet up not found'));
    // user is owner of meetup
    if (meetup.meetupCreator.toHexString() === req.user.id) {
        return next(httpError(403, 'can not leave own meetup'));
    }

    // check user is already join the meetup
    // to havy when array is larger
    if (!meetup.joinedPeople.includes(req.user.id)) {
        return next(httpError(403, 'not mamber of this meetup'));
    }
    meetup.joinedPeopleCount--;
    meetup.joinedPeople.pop(req.user.id);
    req.user.joinedMeetups.pop(meetup.id);

    await Promise.all([meetup.save(), req.user.save()]);
    sendResponse(res, 200, {
        data: { message: `successfully leave from "${meetup.title}" meetup` }
    });
});
