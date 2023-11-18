const express = require('express');
const connection = require('./db/db_connection');
const cors = require('cors');
const bcrypt = require('bcrypt');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());


// Sign up logic (password encryption)
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


// Sign in logic (inputs here are just temporary must be changed to req.body.username)
app.get('/signin', (req, res) => {
    const sql = `SELECT * FROM account WHERE username = ?`;
    const username = "jerichopasco";
    const password = "jerichopasco";

    connection.query(sql, [username], (err, rows) => {
        if (rows.length === 0) {
            res.send({message: "User not found"});
            return;
        }

        console.log(rows[0].password);
        console.log(password);

        bcrypt.compare(password, rows[0].password, (err, isPasswordMatch) => {
            if(isPasswordMatch) {
                res.send({message: "Login Successful"});
            } else {
                res.send({message: "Invalid Credentials"});
            }
        })
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
