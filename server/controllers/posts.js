const Post = require('../models/posts');
const {
    Types: { ObjectId }
} = require('mongoose');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');
const httpError = require('http-errors');

exports.getPosts = catchError(async (req, res, next) => {
    const { threadId } = req.query;
    if (!ObjectId.isValid(threadId)) {
        return next(httpError(400, 'invalid thread id'));
    }

    const posts = await Post.find({ thread: threadId })
        .populate('user')
        .select('-_id');

    sendResponse(res, 200, { data: posts });
});
