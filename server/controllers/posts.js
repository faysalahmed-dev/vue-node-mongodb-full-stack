const Post = require('../models/posts');
const Thread = require('../models/threads');
const Meetup = require('../models/meetups');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');
const httpError = require('http-errors');

exports.getPosts = catchError(async (req, res) => {
    const { threadId } = req.query;

    const posts = await Post.find({ thread: threadId }).populate('user', 'id name avatar');

    sendResponse(res, 200, { data: posts });
});

exports.createPost = catchError(async (req, res, next) => {
    // check thread is exites
    const thread = await Thread.findById(req.params.threadId);

    if (!thread) return next(httpError(400, 'thread not found'));

    // check user is a mamber or creator the meetup
    const meetup = await Meetup.findById(thread.meetup.toHexString());

    const isMamberOrOwnerOfMeetup =
        meetup.meetupCreator.toHexString() === req.user.id ||
        meetup.joinedPeople.includes(req.user.id);
    if (!isMamberOrOwnerOfMeetup) {
        return next(httpError(400, 'only meetup joined people allowed to create post'));
    }

    const post = await Post.create({
        text: req.body.text,
        user: req.user.id,
        thread: req.params.threadId
    });
    thread.posts.push(post.id);
    await thread.save();
    post.populate('user', 'id name avatar').execPopulate((err, data) => {
        if (err) {
            return next(err);
        }
        sendResponse(res, 201, { data });
    });
});
