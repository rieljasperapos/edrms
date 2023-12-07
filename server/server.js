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

// app.post('/accounts', (req, res) => {
//     const sql = `SELECT * FROM account WHERE username = ?`;
//     connection.query(sql, [req.body.userName], (err, rows) => {
//         console.log(req.body.userName);
//         console.log(rows);
//         if (rows.length != 0) {
//             return res.send({message: "Username already exist", exist: true});
//         } else {
//             return res.send({rows, exist: false});
//         }
//     })
// })

// Sign up logic (password encryption)
app.use('/', authRoutes);
// app.post('/signup', (req, res) => {
//     connection.query(`SELECT * FROM account WHERE username = ?`, [req.body.userName], (err, rows) => {
//         if (rows.length == 0) {
//             console.log(req.body);
//             if (!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.middleName || !req.body.birthDate) {
//                 res.send({ message: "All fields must be filled out" });
//                 return;
//             }
//             bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
//                 if (err) {
//                     res.status(500).send({ message: "Error hashing the password" });
//                     return;
//                 }

//                 const sql = `INSERT INTO account (username, password, last_name, first_name, middle_name, birthdate) VALUES (?, ?, ?, ?, ?, ?)`;
//                 connection.query(sql, [req.body.userName, hashedPassword, req.body.lastName, req.body.firstName, req.body.middleName, req.body.birthDate], (err, rows) => {
//                     if (err) {
//                         res.send({ message: "Error registering a user" });
//                     } else {
//                         res.send({ message: "Registered Successfully", valid: true});
//                     }
//                 })
//             })
//         } else {
//             res.send({message: "User already exist", valid: false});
//         }
//     })
// })

// Just to test in postman
app.get('/signup', (req, res) => {
    const sql = `SELECT * FROM account`;
    connection.query(sql, (err, rows) => {
        res.send(rows);
    })
})

// app.get('/appointments/edit/:appointmentId', (req, res) => {
//     const sql = `SELECT * FROM appointment WHERE appointment_id = ?`;
//     connection.query(sql, [req.params.appointmentId], (err, rows) => {
//         if (err) {
//             res.send({message: "Error"});
//         } else {
//             res.send(rows);
//         }
//     })
// })

// app.get('/signin', (req, res) => {
//     if (req.session.authorized) {
//         res.redirect('/dashboard');
//     }
// })

// Sign in logic
// app.post('/signin', (req, res) => {
//     const sql = `SELECT * FROM account WHERE username = ?`;
//     connection.query(sql, [req.body.userName], (err, rows) => {
//         if (rows.length === 0) {
//             res.send({ message: "User not found", valid: false });
//             return;
//         }

//         console.log('Before setting session:', req.session);

//         console.log(rows[0].password);
//         bcrypt.compare(req.body.password, rows[0].password, (err, isPasswordMatch) => {
//             if (isPasswordMatch) {
//                 req.session.authorized = true;
//                 req.session.user = rows[0].username
//                 // req.session.user = rows[0].username;
//                 // console.log(req.session);
//                 console.log('Login successful. Session after login:', req.session);
//                 res.send({ message: "Login successful", valid: true });
//             } else {
//                 res.send({ message: "Invalid Credentials", valid: false });
//             }
//         })
//     })
// })

app.use('/appointments', appointmentRoutes);

// app.post('/addAppointment', (req, res) => {
//     console.log(req.body);
//     const sql = `INSERT INTO appointment (date_schedule, time_schedule, name, contact_number, purpose) VALUES (?, ?, ?, ?, ?)`;
//     connection.query(sql, [req.body.date, req.body.timeSchedule, req.body.name, req.body.contactNumber, req.body.purpose], (err, rows) => {
//         if (err) {
//             res.send({message: "Error cannot add appointment"});
//         } else {
//             res.send({message: "Successfully Added"})
//         }
//     })
// })

// app.get('/appointments', (req, res) => {
//     const sql = `SELECT * FROM appointment`;
//     connection.query(sql, (err, rows) => {
//         if (err) {
//             res.send({message: "Error fetching the data"});
//         } else {
//             res.send(rows);
//         }
//     })
// })

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

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})
