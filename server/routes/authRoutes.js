const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateUsername = require("../validations/userNameValidator");
const validateSession = require("../validations/sessionValidator");

// router.post('/signup', authController.signup);
// router.post('/signin', authController.login);
// router.post('/accounts', validateUsername.checkUsername);
// router.get('/signout', authController.signout);
router.get("/session", validateSession.getSession);
router.put("/account/:accountId", authController.editAccount);
// router.post("/getAccountById", authController.getAccount);
router.get("/getAccountById", authController.getAccount);

module.exports = router;
