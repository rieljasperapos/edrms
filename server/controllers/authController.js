const bcrypt = require('bcrypt');
const connection = require('../db/db_connection');
const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());
const sessionConfig = require('../configs/sessionConfigs');
app.use(session(sessionConfig));

exports.signup = (req, res) => {
    connection.query(`SELECT * FROM account WHERE username = ?`, [req.body.userName], (err, rows) => {
        if (rows.length == 0) {
            console.log(req.body);
            if (!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.middleName || !req.body.birthDate) {
                res.send({ message: "All fields must be filled out" });
                return;
            }
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    res.status(500).send({ message: "Error hashing the password" });
                    return;
                }

                const sql = `INSERT INTO account (username, password, last_name, first_name, middle_name, birthdate) VALUES (?, ?, ?, ?, ?, ?)`;
                connection.query(sql, [req.body.userName, hashedPassword, req.body.lastName, req.body.firstName, req.body.middleName, req.body.birthDate], (err, rows) => {
                    if (err) {
                        res.send({ message: "Error registering a user" });
                    } else {
                        res.send({ message: "Registered Successfully", valid: true });
                    }
                });
            });
        } else {
            res.send({ message: "User already exists", valid: false });
        }
    });
};

exports.login = (req, res) => {
    const sql = `SELECT * FROM account WHERE username = ?`;
    connection.query(sql, [req.body.userName], (err, rows) => {
        if (rows.length === 0) {
            res.send({ message: "User not found", valid: false });
            return;
        }

        // console.log('Before setting session:', req.session);

        console.log(rows[0].password);
        bcrypt.compare(req.body.password, rows[0].password, (err, isPasswordMatch) => {
            if (isPasswordMatch) {
                console.log(rows[0]);
                req.session.authorized = true;
                req.session.user = rows[0].username
                req.session.userId = rows[0].account_id
                // req.session.user = rows[0].username;
                // console.log(req.session);
                console.log('Login successful. Session after login:', req.session);
                res.send({ message: "Login successful", valid: true });
            } else {
                res.send({ message: "Invalid Credentials", valid: false });
            }
        })
    })
};

exports.signout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ message: `ERROR destroying the session ${err}` });
        } else {
            res.clearCookie('connect.sid');
            res.send({ message: "Logout Successfull" });
        }
    })
}