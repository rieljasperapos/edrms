const express = require('express');
const session = require('express-session');
const connection = require('./db/db_connection');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const port = 3000;
const sessionSecret = uuidv4();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET, POST"],
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000,
    },
}))

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

// app.get('/signin', (req, res) => {
//     if (req.session.authorized) {
//         res.redirect('/dashboard');
//     }
// })

// Sign in logic
app.post('/signin', (req, res) => {
    const sql = `SELECT * FROM account WHERE username = ?`;
    connection.query(sql, [req.body.userName], (err, rows) => {
        if (rows.length === 0) {
            res.send({message: "User not found", valid: false});
            return;
        }
        
        console.log('Before setting session:', req.session);

        console.log(rows[0].password);
        bcrypt.compare(req.body.password, rows[0].password, (err, isPasswordMatch) => {
            if(isPasswordMatch) {
                req.session.authorized = true;
                req.session.user = rows[0].username
                // req.session.user = rows[0].username;
                // console.log(req.session);
                console.log('Login successful. Session after login:', req.session);
                res.send({message: "Login successful", valid: true});
            } else {
                res.send({message: "Invalid Credentials", valid: false});
            }
        })
    })
})

app.get('/dashboard', (req, res) => {
    console.log('Dashboard route. Session:', req.session);
    if (req.session.user) {
        console.log('User found in session. Username:', req.session.user);
        res.send({valid: true, username: req.session.user});
    } else {
        res.send({message: "Error", valid: false})
    }
})

app.get('/signout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({message: `ERROR destroying the session ${err}`});
        } else {
            res.clearCookie('connect.sid');
            res.send({message: "Logout Successfull"});
        }
    }) 
})

http://localhost:3000/visits
app.get('/visits', (req, res) => {
    connection.query("SELECT * FROM `visit`", (error, rows, fields) => {
        res.send(rows)
    })
})

// http://localhost:3000/visitsWithTreatment
app.get('/visitsWithTreatment', (req, res) => {
    const sqlQuery = `
        SELECT
            v.date_visit,
            v.notes,
            v.visit_purpose,
            v.prescription,
            COALESCE(t.treatment_name, 'No Treatment') AS treatment_name
        FROM
            visit v
        LEFT JOIN
            treatment_rendered tr ON v.visit_id = tr.visit_id
        LEFT JOIN
            treatment t ON tr.treatment_id = t.treatment_id;
    `;

    connection.query(sqlQuery, (error, rows, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(rows);
        }
    });
});


app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})
