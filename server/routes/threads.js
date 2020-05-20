const express = require('express');
const router = express.Router();
const { checkObjectId } = require('../middlerwere/checkObjectId');
const ThreadsCtrl = require('../controllers/threads');
const { isAuthenticated } = require('../middlerwere/auth');
const { validate, threadsCreate } = require('../middlerwere/validator');

router.get('/', checkObjectId({ extractFrom: 'query', key: 'meetupId' }), ThreadsCtrl.getThreads);
router.post(
    '/create-thread',
    checkObjectId({ extractFrom: 'query', key: 'meetupId' }),
    isAuthenticated,
    threadsCreate,
    validate,
    ThreadsCtrl.createThreads
);

module.exports = router;
