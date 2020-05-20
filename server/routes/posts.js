const express = require('express');
const router = express.Router();

const PostsCtrl = require('../controllers/posts');
const { validate, postCreateValidator } = require('../middlerwere/validator');
const { isAuthenticated } = require('../middlerwere/auth');
const { checkObjectId } = require('../middlerwere/checkObjectId');

router.get('/', checkObjectId({ extractFrom: 'query', key: 'threadId' }), PostsCtrl.getPosts);
router.post(
    '/create-post/:threadId',
    checkObjectId({ extractFrom: 'params', key: 'threadId' }),
    isAuthenticated,
    postCreateValidator,
    validate,
    PostsCtrl.createPost
);

module.exports = router;
