const Thread = require('../models/threads');
const {
    Types: { ObjectId }
} = require('mongoose');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');
const httpError = require('http-errors');

exports.getThreads = catchError(async (req, res, next) => {
    const { meetupId } = req.query;
    if (!ObjectId.isValid(meetupId)) {
        return next(httpError(400, 'invalid meetup id'));
    }

    const thereads = await Thread.find({})
        .where({ meetup: meetupId })
        .populate({
            path: 'posts',
            options: { limit: 5, sort: { createdAt: -1 } },
            populate: { path: 'user' }
        });
    sendResponse(res, 200, { data: thereads });
});
