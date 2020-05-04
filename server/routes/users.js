const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const { signupValidator, validate, loginValidator } = require('../middlerwere/validator');

router.get('', UsersCtrl.getUsers);
router.post('/login', loginValidator, validate, UsersCtrl.login);
router.post('/signup', signupValidator, validate, UsersCtrl.signup);
router.post('/logout', signupValidator, validate, UsersCtrl.signup);

module.exports = router;
