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

// For the visit table and view modal
// http://localhost:3000/visits/2
app.get('/visits/:patientID', (req, res) => {
    console.log(req.body);
    const sqlQuery = `
    SELECT
    DATE_FORMAT(v.date_visit, '%m-%d-%Y') AS date_visit,
    v.visit_id,
    v.notes,
    v.visit_purpose,
    v.prescription,
    v.additional_fees,
    v.amount_paid,
    v.discount,
    GROUP_CONCAT(t.treatment_name SEPARATOR ', ') AS treatment,
    (SUM(t.treatment_fee) + v.additional_fees - v.amount_paid - v.discount) AS balance
FROM
    visit v
INNER JOIN treatment_rendered tr ON v.visit_id = tr.visit_id
INNER JOIN treatment t ON tr.treatment_id = t.treatment_id
WHERE
    v.patient_id = ?
GROUP BY
    v.visit_id  -- Assuming visit_id is the primary key of the visit table
ORDER BY
    v.date_visit DESC; -- Order by date_visit in descending order (most recent first)
    `;

    connection.query(sqlQuery,[req.params.patientID],(error, rows, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(rows);
        }
    });
});

// For the add visit modal
// http://localhost:3000/addVisit
app.post('/addVisit', (req, res) => {
    const { visit_id, patient_id, visit_purpose, date_visit, additional_fees, amount_paid, discount, prescription, notes } = req.body;

    connection.query('INSERT INTO `visit` (`visit_id`, `patient_id`, `visit_purpose`, `date_visit`, `additional_fees`, `amount_paid`, `discount`, `prescription`, `notes`, `is_deleted`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', 
    [visit_id, patient_id, visit_purpose, date_visit, additional_fees, amount_paid, discount, prescription, notes], 
    (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).send({ message: 'Error: Data incomplete or invalid.' });
        } else {
            res.status(200).send({ message: 'Visit added successfully.' });
        }
    });
})

// For the vital sign modal
// http://localhost:3000/addVitalSigns
app.post('/addVitalSigns', (req, res) => {
    const { visit_id, temperature, pulse_rate, systolic_bp, diastolic_bp, time_taken } = req.body;

    connection.query(
        'INSERT INTO vital_signs (visit_id, temperature, pulse_rate, systolic_bp, diastolic_bp, time_taken, is_deleted) VALUES (?, ?, ?, ?, ?, ?, 0)',
        [visit_id, temperature, pulse_rate, systolic_bp, diastolic_bp, time_taken],
        (error, results, fields) => {
            if (error) {
                console.error('Error inserting vital signs data: ' + error.stack);
                res.status(400).send({ message: 'Error: Data incomplete or invalid.' });
            } else {
                res.status(200).send({ message: 'Vital signs added successfully.' });
            }
        }
    );
});


app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})
