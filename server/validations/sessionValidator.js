const connection = require('../db/db_connection');
const express = require('express');
const session = require('express-session');
const sessionConfig = require('../configs/sessionConfigs');
const app = express();
app.use(express.json());
app.use(session(sessionConfig));

const getSession = (req, res) => {
    // console.log("Dashboard route. Session:", req.session);
    if (req.session.username) {
        console.log("User found in session. Username:", req.session.username);
        res.send({
            valid: req.session.authorized,
            accountId: req.session.userId,
            username: req.session.username,
            lastname: req.session.lastName,
            firstName: req.session.firstName,
            middleName: req.session.middleName,
            birthdate: req.session.birthdate,
            isAdmin: req.session.isAdmin,
        });
    } else {
        res.send({ message: "Error no session Info", valid: false });
    }
}

module.exports = { getSession };