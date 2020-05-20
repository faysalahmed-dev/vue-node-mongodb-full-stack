const Thread = require('../models/threads');
const Meetup = require('../models/meetups');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');
const httpError = require('http-errors');

exports.getThreads = catchError(async (req, res) => {
    const { meetupId } = req.query;
    const thereads = await Thread.find({})
        .where({ meetup: meetupId })
        .populate({
            path: 'posts',
            options: { limit: 5, sort: { createdAt: -1 } },
            populate: { path: 'user', select: 'id name avatar' }
        })
        .populate('user', 'id name avatar');
    sendResponse(res, 200, { data: thereads });
});

exports.createThreads = catchError(async (req, res, next) => {
    const { meetupId } = req.query;

    const meetup = await Meetup.findById(meetupId);
    // eheck meetup found or exits
    if (!meetup) return next(httpError(400, 'meetup not found'));

    // check user is mamber or owner of this meetup
    const checkUseIsJoinedMeetup =
        meetup.meetupCreator.toHexString() === req.user.id ||
        meetup.joinedPeople.includes(req.user.id);

    if (!checkUseIsJoinedMeetup) {
        return next(httpError(403, 'only meetup owner or mamber create Thread'));
    }
    // create meetup
    let newThread = await Thread.create({
        title: req.body.title,
        meetup: meetupId,
        user: req.user.id
    });
    newThread = await newThread.populate('user', 'id name avatar').execPopulate();
    sendResponse(res, 201, { data: newThread });
});
