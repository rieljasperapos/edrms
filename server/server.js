const express = require('express');
const connection = require('./db/db_connection');
const cors = require('cors');
const bcrypt = require('bcrypt');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
    console.log(req.body);
    if (!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.middleName || !req.body.birthDate) {
        res.send({message: "All fields must be filled out"});
        return;
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).send({message: "Error hashing the password"});
            return;
        }

        const sql = `INSERT INTO account (username, password, last_name, first_name, middle_name, birthdate) VALUES (?, ?, ?, ?, ?, ?)`;
        connection.query(sql, [req.body.userName, hashedPassword, req.body.lastName, req.body.firstName, req.body.middleName, req.body.birthDate], (err, rows) => {
            if (err) {
                res.send({message: "Error registering a user"});
            } else {
                res.send({message: "Registered Successfully"});
            }
        })
    })
})

app.get('/signup', (req, res) => {
    const sql = `SELECT * FROM account`;
    connection.query(sql, (err, rows) => {
        res.send(rows);
    })
})

app.get('/dashboard', (req, res) => {
    res.send({ message: "Welcome to the dashboard!" });
});


app.get('/', (req, res) => {
    res.send({message: "HELLO WORLD"});
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})
