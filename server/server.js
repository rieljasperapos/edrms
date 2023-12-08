const express = require('express');
const session = require('express-session');
const connection = require('./db/db_connection');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentsRoute');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const sessionConfigs = require('./configs/sessionConfigs');
const port = 3000;
const sessionSecret = uuidv4();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET, POST, PUT"],
    credentials: true
}));
app.use(express.json());
// app.use(session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         maxAge: 60 * 60 * 1000,
//     },
// }))
app.use(session(sessionConfigs));

// SIGN UP 
app.post('/signup', (req, res) => {
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
})

// SIGN IN
app.post('/signin', (req, res) => {
    const sql = `SELECT * FROM account WHERE username = ?`;
    connection.query(sql, [req.body.userName], (err, rows) => {
        if (rows.length === 0) {
            res.send({ message: "User not found", valid: false });
            return;
        }
        // console.log('Before setting session:', req.session);
        // console.log(rows[0].password);
        bcrypt.compare(req.body.password, rows[0].password, (err, isPasswordMatch) => {
            if (isPasswordMatch) {
                // console.log(rows[0]);
                req.session.userId = rows[0].account_id
                req.session.authorized = true;
                req.session.username = rows[0].username
                req.session.firstName = rows[0].first_name
                req.session.lastName = rows[0].last_name
                req.session.middleName = rows[0].middle_name
                req.session.birthdate = rows[0].birthdate
                req.session.password = rows[0].password
                // console.log(req.session);
                // console.log('Login successful. Session after login:', req.session);
                res.send({ message: "Login successful", valid: true });
            } else {
                res.send({ message: "Invalid Credentials", valid: false });
            }
        })
    })
})

// USERNAME CHECKER VALIDATOR
app.post('/accounts', (req, res) => {
    const sql = `SELECT * FROM account WHERE username = ?`;
    connection.query(sql, [req.body.userName], (err, rows) => {
        console.log(req.body.userName);
        console.log(rows);
        if (rows.length !== 0) {
            return res.send({ message: "Username already exists", exist: true });
        } else {
            return res.send({ rows, exist: false });
        }
    });
})

// SIGN OUT
app.get('/signout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ message: `ERROR destroying the session ${err}` });
        } else {
            res.clearCookie('connect.sid');
            res.send({ message: "Logout Successfull" });
        }
    })
})

// GET SESSION
app.get('/session', (req, res) => {
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
})

// EDIT ACCOUNT
app.put('/account/:accountId', (req, res) => {
    console.log(req.params.accountId);
    const sql = 
        `UPDATE account 
        SET first_name = ?, middle_name = ?, last_name = ?, birthdate = ?
        WHERE account_id = ?`
    ;

    console.log(req.body);
    console.log(req.params.accountId);
    // const status = req.body.status || "Confirmed";

    connection.query(sql, [req.body.firstName, req.body.middleName, req.body.lastname, req.body.birthdate, req.params.accountId], (err, rows) => {
        if (err) {
            res.send({message: "Error cannot update"});
        } else {
            res.send({message: "Updated Successfully"});
        }
    })
})

// GET ACCOUNT BY ACCOUNT_ID
app.post('/getAccountById', (req, res) => {
    const sql = `SELECT * FROM account WHERE account_id = ?`;
    console.log(req.body);

    connection.query(sql, [req.body.accountId], (err, rows) => {
        if (err) {
            res.send({message: "Error internal server in node"});
        } else {
            console.log(rows)
            res.send(rows[0]);
        }
    })
})


// Just to test in postman
app.get('/signup', (req, res) => {
    const sql = `SELECT * FROM account`;
    connection.query(sql, (err, rows) => {
        res.send(rows);
    })
})

// app.use('/appointments', appointmentRoutes);

// ADD APPOINTMENTS
app.post('/appointments/add', (req, res) => {
    let patientId;
    let isPrevious;
    connection.query(
        `SELECT patient_id 
        FROM patient 
        WHERE CONCAT(last_name, ', ', first_name, ' ', middle_name) = ?`,
        req.body.name,
        (err, rows) => {
            if (err) {
                res.send({ message: "Error checking patient existence" });
            } else {
                console.log(rows);
                if (rows.length !== 0) {
                    patientId = rows[0].patient_id;
                    isPrevious = 1;
                    console.log(rows[0].patient_id);
                    console.log(`My patient ID: ${patientId}`);
                }

                // Continue with the appointment insertion
                const sql = `INSERT INTO appointment (date_schedule, time_schedule, name, contact_number, purpose, is_previous_patient, patient_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(
                    sql,
                    [req.body.date, req.body.timeSchedule, req.body.name, req.body.contactNumber, req.body.purpose, isPrevious || 0, patientId || null],
                    (err, rows) => {
                        if (err) {
                            res.send({ message: "Error cannot add appointment" });
                        } else {
                            res.send({ message: "Successfully Added" });
                        }
                    }
                );
            }
        }
    );
})

// GET APPOINTMENTS
app.get('/appointments', (req, res) => {
    const sql = `SELECT * FROM appointment ORDER BY time_schedule ASC`;
    connection.query(sql, (err, rows) => {
        if (err) {
            res.send({message: "Error fetching the data"});
        } else {
            res.send(rows);
        }
    })
})

// EDIT APPOINTMENT
app.put('/appointments/edit/:appointmentId', (req, res) => {
    console.log(req.params.appointmentId);
    const sql = 
        `UPDATE appointment 
        SET date_schedule = ?, time_schedule = ?, name = ?, contact_number = ?, purpose = ?, status = ?
        WHERE appointment_id = ?`
    ;

    console.log(req.body);
    console.log(req.params.appointmentId);

    const status = req.body.status || "Confirmed";

    connection.query(sql, [req.body.date, req.body.timeSchedule, req.body.name, req.body.contactNumber, req.body.purpose, status, req.params.appointmentId], (err, rows) => {
        if (err) {
            res.send({message: "Error cannot update"});
        } else {
            res.send({message: "Updated Successfully"});
        }
    })
})

// GET APPOINTMENT BY ID
app.get('/appointments/:appointmentId', (req, res) => {
    console.log(req.params.appointmentId);
    const sql = `SELECT * FROM appointment WHERE appointment_id = ?`;
    connection.query(sql, [req.params.appointmentId], (err, rows) => {
        if (err) {
            res.send({message: "Error"});
        } else {
            res.send(rows);
        }
    })
})

// CHECK TOTAL APPOINTMENT CANCELLED
app.post('/appointments/totalCancelled', (req, res) => {
    const sql = `SELECT COUNT(*) AS totalCancelled FROM appointment WHERE status = ? AND date_schedule = ?`;
    console.log(req.body)

    connection.query(sql, [req.body.status, req.body.date], (err, rows) => {
        if (rows.length > 0) {
            console.log("Total Cancelled Appointments:", rows[0].totalCancelled);
            res.status(200).json({ totalCancelled: rows[0].totalCancelled });
        } else {
            console.log("No cancelled appointments found");
            res.status(200).json({ totalCancelled: 0 });
        }
    });
})

// CHECK TOTAL APPOINTMENT CONFIRMED
app.post('/appointments/totalConfirmed', (req, res) => {
    const sql = `SELECT COUNT(*) AS totalConfirmed FROM appointment WHERE status = ? AND date_schedule = ?`;
    console.log(req.body)

    connection.query(sql, [req.body.status, req.body.date], (err, rows) => {
        if (rows.length > 0) {
            console.log("Total Confirmed Appointments:", rows[0].totalConfirmed);
            res.status(200).json({ totalConfirmed: rows[0].totalConfirmed });
        } else {
            console.log("No confirmed appointments found");
            res.status(200).json({ totalConfirmed: 0 });
        }
    });
})

// CHECK PATIENT EXIST (VALIDATOR)
app.post('/appointments/patient', (req, res) => {
    const sql = `SELECT patient_id FROM patient WHERE CONCAT(last_name, ', ', first_name, ' ', middle_name) = ?`;
    connection.query(sql, [req.body.name], (err, rows) => {
        if (rows.length == 0) {
            res.send({message: "Patient didnt exist", exist: false});
        } else {
            res.send({message: "Patient Exists", exist: true});
        }
    })
})

// SIGN UP



// app.get('/dashboard', (req, res) => {
//     console.log('Dashboard route. Session:', req.session);
//     if (req.session.user) {
//         console.log('User found in session. Username:', req.session.user);
//         res.send({ valid: true, username: req.session.user });
//     } else {
//         res.send({ message: "Error", valid: false })
//     }
// })

// app.get('/signout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             res.send({ message: `ERROR destroying the session ${err}` });
//         } else {
//             res.clearCookie('connect.sid');
//             res.send({ message: "Logout Successfull" });
//         }
//     })
// })

// For the visit table and view modal
// http://localhost:3000/visits/2
app.get('/visits/:patientID', (req, res) => {
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

// For the vital sign table in view modal
// http://localhost:3000/vital_signs/1
app.get('/vital_signs/:visitID', (req, res) => {
    const sqlQuery = `
    SELECT
        temperature,
        pulse_rate,
        systolic_bp,
        diastolic_bp,
        time_taken
    FROM
        vital_signs
    WHERE
        visit_id = ?;
    `;

    connection.query(sqlQuery,[req.params.visitID],(error, rows, fields) => {
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
