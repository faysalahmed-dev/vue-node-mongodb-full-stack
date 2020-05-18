const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const { isAuthenticated } = require('../middlerwere/auth');
const { upload, resizeImage } = require('../middlerwere/uploadFile');
const {
    createMeetupValidator,
    validate,
    transformMeetupCreateBody
} = require('../middlerwere/validator');

router.get('', MeetupsCtrl.getMeetups);
router.get('/:slug', MeetupsCtrl.getMeetupBySlug);
router.post(
    '/create-meetup',
    isAuthenticated,
    upload,
    transformMeetupCreateBody,
    createMeetupValidator,
    validate,
    resizeImage,
    MeetupsCtrl.createMeetup
);
router.patch('/:meetupId/join', isAuthenticated, MeetupsCtrl.joinMeetup);
router.delete('/:meetupId/leave', isAuthenticated, MeetupsCtrl.leaveMeetup);
module.exports = router;
