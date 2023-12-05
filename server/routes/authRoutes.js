const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUsername = require('../validations/userNameValidator');

router.post('/signup', authController.signup);
router.post('/signin', authController.login);
router.post('/accounts', validateUsername.checkUsername);
router.get('/signout', authController.signout);


module.exports = router;