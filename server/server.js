const express = require("express");
const session = require("express-session");
const connection = require("./db/db_connection");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const port = 3000;
const sessionSecret = uuidv4();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET, POST"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  }),
);

// Sign up logic (password encryption)
app.post("/signup", (req, res) => {
  console.log(req.body);
  if (
    !req.body.userName ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.middleName ||
    !req.body.birthDate
  ) {
    res.send({ message: "All fields must be filled out" });
    return;
  }

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: "Error hashing the password" });
      return;
    }

    const sql = `INSERT INTO account (username, password, last_name, first_name, middle_name, birthdate) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [
        req.body.userName,
        hashedPassword,
        req.body.lastName,
        req.body.firstName,
        req.body.middleName,
        req.body.birthDate,
      ],
      (err, rows) => {
        if (err) {
          res.send({ message: "Error registering a user" });
        } else {
          res.send({ message: "Registered Successfully" });
        }
      },
    );
  });
});

//signup read
app.get("/signup", (req, res) => {
  const sql = `SELECT * FROM account`;
  connection.query(sql, (err, rows) => {
    res.send(rows);
  });
});

//signin read
app.get("/signin", (req, res) => {
  if (req.session.authorized) {
    res.redirect("/dashboard");
  }
});

// Sign in logic
app.post("/signin", (req, res) => {
  const sql = `SELECT * FROM account WHERE username = ?`;
  connection.query(sql, [req.body.userName], (err, rows) => {
    if (rows.length === 0) {
      res.send({ message: "User not found", valid: false });
      return;
    }

    console.log("Before setting session:", req.session);

    console.log(rows[0].password);
    bcrypt.compare(
      req.body.password,
      rows[0].password,
      (err, isPasswordMatch) => {
        if (isPasswordMatch) {
          req.session.authorized = true;
          req.session.user = rows[0].username;
          // req.session.user = rows[0].username;
          // console.log(req.session);
          console.log("Login successful. Session after login:", req.session);
          res.send({ message: "Login successful", valid: true });
        } else {
          res.send({ message: "Invalid Credentials", valid: false });
        }
      },
    );
  });
});

app.get("/dashboard", (req, res) => {
  console.log("Dashboard route. Session:", req.session);
  if (req.session.user) {
    console.log("User found in session. Username:", req.session.user);
    res.send({ valid: true, username: req.session.user });
  } else {
    res.send({ message: "Error", valid: false });
  }
});

app.get("/dashboard", (req, res) => {
  console.log("Dashboard route. Session:", req.session);
  if (req.session.user) {
    console.log("User found in session. Username:", req.session.user);
    res.send({ valid: true, username: req.session.user });
  } else {
    res.send({ message: "Error", valid: false });
  }
});

app.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send({ message: `ERROR destroying the session ${err}` });
    } else {
      res.clearCookie("connect.sid");
      res.send({ message: "Logout Successful" });
    }
  });
});

app.get("/patientInfoList", (req, res) => {
  connection.query(
    `SELECT p.patient_id, p.last_name, p.first_name, p.middle_name, p.contact_number, IFNULL(DATE_FORMAT(recent_visit.recent_visit_date, '%Y-%m-%d'), NULL) AS recent_visit_date
     FROM patient p
     LEFT JOIN ( 
     SELECT patient_id, MAX(date_visit) AS recent_visit_date
     FROM visit
     GROUP BY patient_id) 
     recent_visit ON p.patient_id = recent_visit.patient_id;`,
    (error, result) => {
      if (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.length === 0) {
          // No patient information found
          res.status(404).send({ message: "No patient information found" });
        } else {
          res.status(200).send(result);
        }
      }
    },
  );
});

app.post("/addRecord", (req, res) => {
  console.log(req.body);

  if (
    !req.body.last_name ||
    !req.body.first_name ||
    !req.body.birthdate ||
    !req.body.sex ||
    !req.body.contact_number ||
    !req.body.street_address ||
    !req.body.city
  ) {
    res.status(400).send({ message: "Fields must be filled out" });
    return;
  }

  const sql = `
    INSERT INTO patient (last_name, first_name, middle_name, birthdate, sex, contact_number, email, street_address, city)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    sql,
    [
      req.body.last_name,
      req.body.first_name,
      req.body.middle_name,
      req.body.birthdate,
      req.body.sex,
      req.body.contact_number,
      req.body.email,
      req.body.street_address,
      req.body.city,
    ],
    (err, rows) => {
      if (err) {
        console.error("Error registering a user:", err);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).send({ message: "Registered Successfully" });
      }
    },
  );
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
