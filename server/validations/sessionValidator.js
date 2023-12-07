const connection = require('../db/db_connection');
const express = require('express');
const session = require('express-session');
const sessionConfig = require('../configs/sessionConfigs');
const app = express();
app.use(express.json());
app.use(session(sessionConfig));

const getSession = (req, res) => {
    // console.log('Dashboard route. Session:', req.session);
    if (req.session.user) {
        // console.log('User found in session. Username:', req.session.user);
        res.send({ valid: true, username: req.session.user });
    } else {
        res.send({ message: "Error", valid: false })
    }
}

module.exports = { getSession };