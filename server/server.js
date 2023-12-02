const express = require("express");
const session = require("express-session");
const connection = require("./db/db_connection");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const port = 3000;
const sessionSecret = uuidv4();
const app = express();
const multer = require("multer");
const path = require("path");

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

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/xrayImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

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

//Patient Info List Page
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

//Add record Create
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

//patient Info Name Header
app.get("/patientName/:patientId", (req, res) => {
  connection.query(
    `SELECT 
    last_name,
    first_name
FROM patient
WHERE patient_id = ?`,
    [req.params.patientId],
    (error, result) => {
      if (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.length === 0) {
          // No patient information found
          res.status(404).send({ message: "No patient name Found" });
        } else {
          res.status(200).send(result[0]);
        }
      }
    },
  );
});

//patient Info modal
app.get("/patientInfo/:patientId", (req, res) => {
  connection.query(
    `SELECT 
    last_name,
    first_name,
    middle_name,
    DATE_FORMAT(birthdate, '%Y-%m-%d') AS birthdate,
    TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age,
    sex,
    contact_number,
    email,
    street_address,
    city
FROM patient
WHERE patient_id = ?`,
    [req.params.patientId],
    (error, result) => {
      if (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.length === 0) {
          // No patient information found
          res.status(404).send({ message: "No patient information found" });
        } else {
          res.status(200).send(result[0]);
        }
      }
    },
  );
});

//Patient Record Recent Visit Modal
app.get("/patientRecordRecentVisit/:patientId", (req, res) => {
  connection.query(
    `SELECT
    DATE_FORMAT(v.date_visit, '%Y-%m-%d') AS date_visit,
    v.visit_purpose,
    GROUP_CONCAT(t.treatment_name SEPARATOR ', ') AS treatment,
    v.prescription,
    v.notes,
    (SUM(t.treatment_fee) + v.additional_fees - v.amount_paid - v.discount) AS balance
FROM
    visit v
INNER JOIN treatment_rendered tr ON v.visit_id = tr.visit_id
INNER JOIN treatment t ON tr.treatment_id = t.treatment_id
WHERE
    v.patient_id = ?
    AND v.date_visit = (
        SELECT MAX(date_visit)
        FROM visit
        WHERE patient_id = ? 
    );`,
    [req.params.patientId, req.params.patientId],
    (error, result) => {
      if (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.length === 0) {
          // No patient information found
          res.status(404).send({ message: "No patient Recent Visit found" });
        } else {
          res.status(200).send(result[0]);
        }
      }
    },
  );
});

//Patient Record Insurance Information READ
app.get("/patientInsuranceList/:patientId", (req, res) => {
  const sql = `SELECT
    insurance_company,
    insurance_id_num,
    DATE_FORMAT(expiration_date, '%Y-%m-%d') AS expiration_date,
    CASE WHEN expiration_date < CURDATE() THEN true ELSE false END AS status,
    company_employed
FROM
    insurance_info
WHERE
    patient_id = ? AND
    is_deleted = 0;`;

  connection.query(sql, [req.params.patientId], (error, result) => {
    if (error) {
      console.error("Error fetching patient information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        // No patient information found
        res.status(404).send({ message: "No patient Insurance Info found" });
      } else {
        res.status(200).send(result);
      }
    }
  });
});

//Add xray data modal Create
app.post(
  "/patientRecordXray/:patientId",
  upload.single("image"),
  (req, res) => {
    const image = req.file.filename;
    const { type, dateTaken, notes } = req.body;

    const sql = `INSERT INTO xray (patient_id, image_path, type, date_taken, notes)
VALUES (?, ?, ?, ?, ?);`;
    console.log(req.file);
    console.log("Received values:", { type, dateTaken, notes });
    console.log(req.params.patientId);
    connection.query(
      sql,
      [req.params.patientId, image, type, dateTaken, notes],
      (err, result) => {
        if (err) {
          res.status(500).send({ message: "Error uploading" });
        } else {
          res.status(200).send({ message: "Uploaded successfully" });
        }
      },
    );
  },
);

//Patient Record Xray List READ
app.get("/patientXrayList/:patientId", (req, res) => {
  const sql = `SELECT xray_id, type, DATE_FORMAT(date_taken, '%Y-%m-%d') AS date_taken, notes FROM xray WHERE patient_id = ? AND is_deleted = 0;`;
  connection.query(sql, [req.params.patientId], (error, result) => {
    if (error) {
      console.error("Error fetching patient information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        // No patient information found
        res.status(404).send({ message: "No Xray List found" });
      } else {
        res.status(200).send(result);
      }
    }
  });
});

//Patient Record Xray List READ
app.get("/patientXrayData/:xrayId", (req, res) => {
  const sql = `SELECT type, DATE_FORMAT(date_taken, '%Y-%m-%d') AS date_taken, notes, image_path FROM xray WHERE xray_id = ? AND is_deleted = 0;`;
  connection.query(sql, [req.params.xrayId], (error, result) => {
    if (error) {
      console.error("Error fetching patient information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        // No patient information found
        res.status(404).send({ message: "No Xray Data found" });
      } else {
        res.status(200).send(result[0]);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
