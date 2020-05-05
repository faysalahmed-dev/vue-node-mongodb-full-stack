const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const { signupValidator, validate, loginValidator } = require('../middlerwere/validator');
const { isAuthenticated } = require('../middlerwere/auth');

router.get('', UsersCtrl.getUsers);
router.post('/login', loginValidator, validate, UsersCtrl.login);
router.post('/signup', signupValidator, validate, UsersCtrl.signup);

router.get('/auth-user', isAuthenticated, UsersCtrl.authUser);
router.get('/logout', isAuthenticated, UsersCtrl.logout);

module.exports = router;
