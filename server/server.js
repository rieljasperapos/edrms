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
    methods: ["GET, POST, PUT"],
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
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Sign up logic (password encryption)
// Sign up logic (password encryption)
app.post("/signup", (req, res) => {
  connection.query(
    `SELECT * FROM account WHERE username = ?`,
    [req.body.userName],
    (err, rows) => {
      if (rows.length == 0) {
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
                res.send({ message: "Registered Successfully", valid: true });
              }
            },
          );
        });
      } else {
        res.send({ message: "User already exist", valid: false });
      }
    },
  );
});

// Just to test in postman
app.get("/signup", (req, res) => {
  const sql = `SELECT * FROM account`;
  connection.query(sql, (err, rows) => {
    res.send(rows);
  });
});

// app.get('/signin', (req, res) => {
//     if (req.session.authorized) {
//         res.redirect('/dashboard');
//     }
// })

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
          req.session.is_admin = rows[0].is_admin; // Include is_admin in the session

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
    res.send({
      valid: true,
      username: req.session.user,
      is_admin: req.session.is_admin,
    });
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

//Read Accounts List
app.get("/manageAccountList", (req, res) => {
  // Corrected SQL query
  const sql =
    "SELECT account_id, username, last_name, first_name, middle_name, DATE_FORMAT(birthdate, '%m-%d-%Y') as birthdate, is_admin, is_deactivated, account_id as view_id FROM `account`";

  connection.query(sql, (error, result) => {
    if (error) {
      console.error("Error fetching account information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        // No account information found
        res.status(404).send({ message: "No Accounts List found" });
      } else {
        res.status(200).send(result);
      }
    }
  });
});

//Patient Info List Page
app.get("/patientInfoList", (req, res) => {
  connection.query(
    `SELECT p.patient_id, p.last_name, p.first_name, p.middle_name, p.contact_number, IFNULL(DATE_FORMAT(recent_visit.recent_visit_date, '%m-%d-%Y'), NULL) AS recent_visit_date
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

  const addPatientSql = `
    INSERT INTO patient (last_name, first_name, middle_name, birthdate, sex, contact_number, email, street_address, city)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const addHealthHistorySql = `
    INSERT INTO health_history (patient_id, diabetic, hypertensive, other_health_conditions, allergies, maintenance_medicines, notes)
    VALUES (?, 0, 0, "None", "None", "None", "None");
  `;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction", err);
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }

    connection.query(
      addPatientSql,
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
      (err, result) => {
        if (err) {
          console.error("Error registering a user:", err);
          res.status(500).send({ message: "Internal Server Error" });
        } else {
          const patientId = result.insertId;
          connection.query(addHealthHistorySql, [patientId], (err) => {
            if (err) {
              connection.rollback(() => {
                console.error("Error adding health history", err);
                res.status(500).send({ message: "Internal Server Error" });
              });
            } else {
              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    console.error("Error committing transaction: ", err);
                    res.status(500).send({ message: "Internal Server Error" });
                  });
                } else {
                  res.status(200).send({ message: "Registered Successfully" });
                }
              });
            }
          });
        }
      },
    );
  });
});

//update Patient Record
app.put("/updateRecord/:patientId", (req, res) => {
  console.log(req.params.patientId);
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

  const updatePatientSql = `
    UPDATE patient
    SET last_name=?, first_name=?, middle_name=?, birthdate=?, sex=?, contact_number=?, email=?, street_address=?, city=?
    WHERE patient_id = ?;
  `;

  connection.query(
    updatePatientSql,
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
      req.params.patientId,
    ],
    (err) => {
      if (err) {
        console.error("Error updating patient information:", err);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).send({ message: "Updated Successfully" });
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
    DATE_FORMAT(birthdate, '%m-%d-%Y') AS birthdate,
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
    DATE_FORMAT(v.date_visit, '%m-%d-%Y') AS date_visit,
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
    insurance_info_id,
    insurance_company,
    insurance_id_num,
    DATE_FORMAT(expiration_date, '%m-%d-%Y') AS expiration_date,
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

//Add insurance Info POST
app.post("/patientRecordInsuranceInfo/:patientId", (req, res) => {
  const { insuranceCompany, insuranceIdNum, expirationDate, companyEmployed } =
    req.body;
  const patientId = req.params.patientId;

  const sql = `INSERT INTO insurance_info(patient_id, insurance_company, insurance_id_num, expiration_date, company_employed) VALUES (?, ?, ?, ?, ?);`;

  connection.query(
    sql,
    [
      patientId,
      insuranceCompany,
      insuranceIdNum,
      expirationDate,
      companyEmployed,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send({ message: "Error inserting data" });
      } else {
        console.log("Data inserted successfully");
        res.status(200).send({ message: "Data inserted successfully" });
      }
    },
  );
});

// Get insurance Info GET
app.get("/patientRecordInsuranceInfo/:insuranceInfoId", (req, res) => {
  const insuranceInfoId = req.params.insuranceInfoId;

  const sql = `SELECT insurance_company, insurance_id_num, DATE_FORMAT(expiration_date, '%m-%d-%Y') AS expiration_date, company_employed FROM insurance_info WHERE insurance_info_id = ?;`;

  connection.query(sql, [insuranceInfoId], (err, result) => {
    if (err) {
      console.error("Error retrieving data:", err);
      res.status(500).send({ message: "Error retrieving data" });
    } else {
      if (result.length === 0) {
        // No insurance info found for the given patient
        res.status(404).send({ message: "No insurance info found" });
      } else {
        console.log("Data retrieved successfully");
        res.status(200).send(result[0]);
      }
    }
  });
});

// Update insurance Info PUT
app.put("/patientRecordInsuranceInfo/:insuranceInfoId", (req, res) => {
  const { insuranceCompany, insuranceIdNum, expirationDate, companyEmployed } =
    req.body;
  const insuranceInfoId = req.params.insuranceInfoId;

  const sql = `
    UPDATE insurance_info
    SET insurance_company=?, insurance_id_num=?, expiration_date=?, company_employed=?
    WHERE insurance_info_id=?;
  `;

  connection.query(
    sql,
    [
      insuranceCompany,
      insuranceIdNum,
      expirationDate,
      companyEmployed,
      insuranceInfoId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).send({ message: "Error updating data" });
      } else {
        console.log("Data updated successfully");
        res.status(200).send({ message: "Data updated successfully" });
      }
    },
  );
});

//Add xray data modal Create
app.post("/patientRecordXray/:patientId", upload.single("xray"), (req, res) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  const { type, dateTaken, notes } = req.body;

  const sql = `INSERT INTO xray (patient_id, image_path, type, date_taken, notes) VALUES (?, ?, ?, ?, ?);`;

  console.log(req.file);
  console.log("Received values:", { type, dateTaken, notes });

  connection.query(
    sql,
    [req.params.patientId, req.file.filename, type, dateTaken, notes],
    (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err);
        res.status(500).send({ message: "Error uploading to database" });
      } else {
        res
          .status(200)
          .send({ message: "Uploaded successfully", data: result });
      }
    },
  );
});

//Patient Record Xray List READ
app.get("/patientXrayList/:patientId", (req, res) => {
  const sql = `SELECT xray_id, xray_id as xray_id_edit, type, DATE_FORMAT(date_taken, '%m-%d-%Y') AS date_taken, notes FROM xray WHERE patient_id = ? AND is_deleted = 0;`;
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

//Patient Record Xray Data READ
app.get("/patientXrayData/:xrayId", (req, res) => {
  const sql = `SELECT type, DATE_FORMAT(date_taken, '%m-%d-%Y') AS date_taken, notes, image_path FROM xray WHERE xray_id = ? AND is_deleted = 0;`;
  console.log(req.body);
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

// Patient Record Xray Data UPDATE (PUT)
app.put(
  "/patientXrayData/:xrayId",
  upload.single("xray_update"),
  (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const { type, dateTaken, notes } = req.body;
    const xrayId = req.params.xrayId;
    const image_path = req.file ? req.file.filename : null; // Get the file path from multer

    // Check if image_path is provided and not null
    const imagePathClause = image_path !== null ? ", image_path = ?" : "";

    const sql = `
    UPDATE xray
    SET type = ?, date_taken = ?, notes = ?${imagePathClause}
    WHERE xray_id = ? AND is_deleted = 0;
  `;

    // Include image_path in the parameters only if it's not null
    const sqlParams =
      image_path !== null
        ? [type, dateTaken, notes, image_path, xrayId]
        : [type, dateTaken, notes, xrayId];

    connection.query(sql, sqlParams, (error, result) => {
      if (error) {
        console.error("Error updating Xray data:", error);
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.affectedRows === 0) {
          // No Xray data found for the given xrayId
          res.status(404).send({ message: "No Xray Data found" });
        } else {
          res.status(200).send({ message: "Xray Data updated successfully" });
        }
      }
    });
  },
);

//Health History Data Read
app.get("/patientHealthHistory/:patientId", (req, res) => {
  const sql = `SELECT health_history_id, diabetic, hypertensive, other_health_conditions, allergies, maintenance_medicines, notes FROM health_history WHERE patient_id = ? AND is_deleted = 0;`;

  connection.query(sql, [req.params.patientId], (error, result) => {
    if (error) {
      console.error("Error fetching patient information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        // No patient information found
        res.status(404).send({ message: "No Health Data found" });
      } else {
        res.status(200).send(result[0]);
      }
    }
  });
});

//Health History Data Read
app.put("/patientHealthHistory/:healthHistoryId", (req, res) => {
  const healthHistoryId = req.params.healthHistoryId;
  const {
    diabetic,
    hypertensive,
    other_health_conditions,
    allergies,
    maintenance_medicines,
    notes,
  } = req.body;

  const sql = `
    UPDATE health_history
    SET diabetic=?, hypertensive=?, other_health_conditions=?, allergies=?, maintenance_medicines=?, notes=?
    WHERE health_history_id = ?`;

  connection.query(
    sql,
    [
      diabetic,
      hypertensive,
      other_health_conditions,
      allergies,
      maintenance_medicines,
      notes,
      healthHistoryId,
    ],
    (error, results) => {
      if (results.affectedRows === 0) {
        res.send({ message: "ID Not Found" });
      } else if (error) {
        res.status(400).send({ message: "Error updating health history" });
      } else {
        res.send({
          message: `Health history updated for ID ${healthHistoryId}`,
        });
      }
    },
  );
});
//Get appointments
app.get("/appointments", (req, res) => {
  const sql = `SELECT * FROM appointment`;
  connection.query(sql, (err, rows) => {
    if (err) {
      res.send({ message: "Error fetching the data" });
    } else {
      res.send(rows);
    }
  });
});

//Add appointment
app.post("/addAppointment", (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO appointment (date_schedule, time_schedule, name, contact_number, purpose) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [
      req.body.date,
      req.body.timeSchedule,
      req.body.name,
      req.body.contactNumber,
      req.body.purpose,
    ],
    (err, rows) => {
      if (err) {
        res.send({ message: "Error cannot add appointment" });
      } else {
        res.send({ message: "Successfully Added" });
      }
    },
  );
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
