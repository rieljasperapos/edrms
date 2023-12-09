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
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentsRoute");

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
  const sql = `SELECT
  account_id,
  username,
  password,
  last_name,
  first_name,
  middle_name,
  DATE_FORMAT(birthdate, '%m-%d-%Y') as birthdate,
  is_admin,
  is_deactivated,
  super_admin
FROM
  account
WHERE
  username = ?;`;
  connection.query(sql, [req.body.userName], (err, rows) => {
    if (rows.length === 0) {
      res.send({ message: "User not found", valid: false });
      return;
    }

    // Check if the account is deactivated
    if (rows[0].is_deactivated) {
      res.send({ message: "Account is deactivated", valid: false });
      return;
    }

    bcrypt.compare(
      req.body.password,
      rows[0].password,
      (err, isPasswordMatch) => {
        if (isPasswordMatch) {
          req.session.authorized = true;
          req.session.accountId = rows[0].account_id;
          req.session.username = rows[0].username;
          req.session.lastName = rows[0].last_name;
          req.session.firstName = rows[0].first_name;
          req.session.middleName = rows[0].middle_name;
          req.session.birthdate = rows[0].birthdate;
          req.session.isAdmin = rows[0].is_admin;

          console.log("Login successful. Session after login:", req.session);
          res.send({ message: "Login successful", valid: true });
        } else {
          res.send({ message: "Invalid Credentials", valid: false });
        }
      },
    );
  });
});

//Session confirmation
app.get("/dashboard", (req, res) => {
  console.log("Dashboard route. Session:", req.session);
  if (req.session.username) {
    console.log("User found in session. Username:", req.session.username);
    res.send({
      valid: req.session.authorized,
      accountId: req.session.accountId,
      username: req.session.username,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.send({ message: "Error session", valid: false });
  }
});

//Get session INfo
app.get("/sessionInfo", (req, res) => {
  console.log("Dashboard route. Session:", req.session);
  if (req.session.username) {
    console.log("User found in session. Username:", req.session.username);
    res.send({
      valid: req.session.authorized,
      accountId: req.session.accountId,
      username: req.session.username,
      lastName: req.session.lastName,
      firstName: req.session.firstName,
      middleName: req.session.middleName,
      birthdate: req.session.birthdate,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.send({ message: "Error no session Info", valid: false });
  }
});

//Signout and deactivating session
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
  const sql = `
  SELECT
    account_id,
    username,
    last_name,
    first_name,
    middle_name,
    DATE_FORMAT(birthdate, '%m-%d-%Y') as birthdate,
    is_admin,
    is_deactivated,
    account_id as view_id,
    account_id as resetPasswordId,
    is_admin as admin_status,
    is_deactivated as deactivation_status
  FROM account
  WHERE super_admin != 1
  ORDER BY is_admin DESC, account_id ASC;
`;

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

//updateAccount profiles
app.put("/updateProfile/:accountId", (req, res) => {
  const accountIdToUpdate = req.params.accountId;
  const newUsername = req.body.username;

  console.log(req.body);
  // Check if the new username is already in use
  connection.query(
    `SELECT * FROM account WHERE username = ? AND account_id != ?`,
    [newUsername, accountIdToUpdate],
    (err, usernameRows) => {
      if (usernameRows.length !== 0 && err) {
        res
          .status(500)
          .send({ message: "Error checking new username existence" });
        return;
      }

      // Check if the username is already in use
      if (usernameRows.length > 0) {
        res.status(409).send({ message: "Username is already in use" });
        return;
      }

      // Continue with the update if the new username is not in use
      // Check if there are no rows (username is available)
      if (usernameRows.length === 0) {
        connection.query(
          `SELECT * FROM account WHERE account_id = ?`,
          [accountIdToUpdate],
          (err, rows) => {
            if (err) {
              console.error("Error checking user existence:", err);

              res
                .status(500)
                .send({ message: "Error checking user existence" });
              return;
            }

            if (rows.length === 0) {
              res.status(404).send({ message: "User not found" });
              return;
            }

            const existingUser = rows[0];

            // Update user information
            const updatedUser = {
              lastName: req.body.lastName || existingUser.last_name,
              firstName: req.body.firstName || existingUser.first_name,
              middleName: req.body.middleName || existingUser.middle_name,
              birthDate: req.body.birthDate || existingUser.birthdate,
            };

            const sql = `UPDATE account SET username=?, last_name=?, first_name=?, middle_name=?, birthdate=? WHERE account_id=?`;

            connection.query(
              sql,
              [
                newUsername,
                updatedUser.lastName,
                updatedUser.firstName,
                updatedUser.middleName,
                updatedUser.birthDate,
                accountIdToUpdate,
              ],
              (err) => {
                if (err) {
                  res
                    .status(500)
                    .send({ message: "Error updating user profile" });
                } else {
                  res.send({
                    message: "Profile updated successfully",
                    valid: true,
                  });
                }
              },
            );
          },
        );
      }
    },
  );
});

//reset Password
app.put("/resetPassword/:accountId", (req, res) => {
  const newPassword = req.body.newPassword;
  const id = req.params.accountId;

  console.log(newPassword);
  console.log(id);
  if (!newPassword) {
    return res
      .status(400)
      .send({ status: 400, message: "New password is required" });
  }

  // Check if the user exists
  connection.query(
    `SELECT * FROM account WHERE account_id = ?`,
    [id],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .send({ status: 500, message: "Error checking user existence" });
      }

      if (rows.length === 0) {
        return res.status(404).send({ status: 404, message: "User not found" });
      }

      const existingPassword = rows[0].password;

      // Check if the new password is different from the old password
      bcrypt.compare(newPassword, existingPassword, (err, isSame) => {
        if (err) {
          return res
            .status(500)
            .send({ status: 500, message: "Error comparing passwords" });
        }

        if (isSame) {
          return res.status(400).send({
            status: 400,
            message: "New password must be different from the old password",
          });
        }

        // Hash the new password
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) {
            return res
              .status(500)
              .send({ status: 500, message: "Error hashing the password" });
          }

          // Update the user's password in the database
          connection.query(
            `UPDATE account SET password = ? WHERE account_id = ?`,
            [hashedPassword, id],
            (err, result) => {
              if (err) {
                return res
                  .status(500)
                  .send({ status: 500, message: "Error updating password" });
              }

              return res.send({
                status: 200,
                message: "Password reset successfully",
                valid: true,
              });
            },
          );
        });
      });
    },
  );
});

// Handle updating admin status
app.put("/handleAdminStatus/:accountId", (req, res) => {
  const accountIdToUpdate = req.params.accountId;

  // Assuming req.body.adminStatus is a boolean indicating the new admin status
  const newAdminStatus = req.body.adminStatus;

  // Update the admin status in the "account" table
  const sql = "UPDATE account SET is_admin = ? WHERE account_id = ?";
  connection.query(sql, [newAdminStatus, accountIdToUpdate], (err, result) => {
    if (err) {
      console.error("Error updating admin status:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Admin status updated successfully");
      res.status(200).json({ message: "Admin status updated successfully" });
    }
  });
});

// Handle Deactivation accoutn status
app.put("/handleDeactivationStatus/:accountId", (req, res) => {
  const accountIdToUpdate = req.params.accountId;

  // Assuming req.body.adminStatus is a boolean indicating the new admin status
  const newDeactivationStatus = req.body.deactivationStatus;

  // Update the admin status in the "account" table
  const sql = "UPDATE account SET is_deactivated = ? WHERE account_id = ?";
  connection.query(
    sql,
    [newDeactivationStatus, accountIdToUpdate],
    (err, result) => {
      if (err) {
        console.error("Error updating admin status:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Admin status updated successfully");
        res.status(200).json({
          message: "Account deactivation status updated successfully",
        });
      }
    },
  );
});

//Patient Info List Page
app.get("/patientInfoList", (req, res) => {
  connection.query(
    `SELECT
  p.patient_id,
  p.last_name,
  p.first_name,
  p.middle_name,
  p.contact_number,
  IFNULL(DATE_FORMAT(recent_visit.recent_visit_date, '%m-%d-%Y'), NULL) AS recent_visit_date
FROM
  patient p
  LEFT JOIN (
    SELECT
      patient_id,
      MAX(date_visit) AS recent_visit_date
    FROM
      visit
    GROUP BY
      patient_id
  ) recent_visit ON p.patient_id = recent_visit.patient_id
  WHERE is_deleted = 0
ORDER BY
  p.last_name ASC;`,
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
                  res
                    .status(200)
                    .send({ message: "Record Added Successfully" });
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
  const sql = `
  SELECT
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
    is_deleted = 0
  ORDER BY expiration_date DESC;
`;

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
  const sql = `
  SELECT
    xray_id,
    xray_id as xray_id_edit,
    type,
    DATE_FORMAT(date_taken, '%m-%d-%Y') AS date_taken,
    notes
  FROM xray
  WHERE patient_id = ?
    AND is_deleted = 0
  ORDER BY date_taken DESC;
`;
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

// Get appointments
app.get("/appointments1", (req, res) => {
  const sql = `SELECT * FROM appointment`;
  connection.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ message: "Error fetching the appointments" });
    } else {
      res.status(200).send({
        success: true,
        message: "Appointments fetched successfully",
        data: rows,
      });
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

//Get treatment List
app.get("/treatmentList", (req, res) => {
  const sql = `SELECT treatment_id, treatment_name, treatment_fee, treatment_id as edit_id, treatment_id as delete_id FROM treatment WHERE is_deleted = 0 ORDER BY treatment_name ASC`;
  connection.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ message: "Error fetching the treatment data" });
    } else {
      res.status(200).send({
        success: true,
        message: "Treatment list fetched successfully",
        data: rows,
      });
    }
  });
});

//Add treatment -- CREATE
app.post("/addTreatment", (req, res) => {
  const { treatment_name, treatment_fee } = req.body;

  if (!treatment_name || !treatment_fee) {
    return res
      .status(400)
      .send({ message: "Treatment name and fee are required" });
  }

  const sql =
    "INSERT INTO treatment (treatment_name, treatment_fee) VALUES (?, ?)";
  connection.query(sql, [treatment_name, treatment_fee], (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error adding the treatment", error: err });
    }

    res.status(201).send({
      success: true,
      message: "Treatment added successfully",
    });
  });
});

//Edit treatment
app.put("/updateTreatment/:treatmentId", (req, res) => {
  const { treatment_name, treatment_fee } = req.body;
  const treatmentId = req.params.treatmentId;

  if (!treatment_name || !treatment_fee) {
    return res
      .status(400)
      .send({ message: "Treatment name and fee are required" });
  }

  const sql =
    "UPDATE treatment SET treatment_name = ?, treatment_fee = ? WHERE treatment_id = ?";
  connection.query(
    sql,
    [treatment_name, treatment_fee, treatmentId],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error updating the treatment", error: err });
      }

      res.status(200).send({
        success: true,
        message: "Treatment updated successfully",
      });
    },
  );
});

//Soft Delete Treatment
app.put("/deleteTreatment/:treatmentId", (req, res) => {
  const treatmentId = req.params.treatmentId;

  // Update the is_deleted field to 1
  const sql = "UPDATE treatment SET is_deleted = 1 WHERE treatment_id = ?";
  connection.query(sql, [treatmentId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error deleting the treatment", error: err });
    }

    res.status(200).send({
      success: true,
      message: "Treatment soft deleted successfully",
    });
  });
});

//Tooth list Read
app.get("/toothNumbers", (req, res) => {
  const sql = "SELECT `tooth_number` FROM `tooth`";

  connection.query(sql, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error fetching tooth numbers", error: err });
    }

    const toothNumbers = rows.map((row) => row.tooth_number);

    res.status(200).send({
      success: true,
      message: "Tooth numbers fetched successfully",
      data: toothNumbers,
    });
  });
});

//Get treatment List
app.get("/teethChart/:patientId", (req, res) => {
  const patientId = req.params.patientId;
  const sql =
    "SELECT tooth_number, status FROM teeth_status WHERE patient_id = ?";

  connection.query(sql, [patientId], (err, rows) => {
    if (err) {
      res.status(500).send({ message: "Error fetching the treatment data" });
    } else {
      res.status(200).send({
        success: true,
        message: "Treatment list fetched successfully",
        data: rows,
      });
    }
  });
});

// Teeth Chart add tooth
app.post("/teethChart/:patientId", (req, res) => {
  const patientId = req.params.patientId;
  const { toothNumber, status } = req.body;

  if (!toothNumber || !status) {
    return res
      .status(400)
      .send({ message: "Tooth Number and status are required" });
  }

  // Check if tooth number already exists
  const checkIfExistsSql = `SELECT COUNT(*) as count FROM teeth_status WHERE patient_id = ? AND tooth_number = ?`;
  connection.query(
    checkIfExistsSql,
    [patientId, toothNumber],
    (checkErr, checkResult) => {
      if (checkErr) {
        return res
          .status(500)
          .send({ message: "Error checking tooth existence", error: checkErr });
      }

      const toothCount = checkResult[0].count;

      if (toothCount > 0) {
        // Tooth number already exists, send an error response
        return res.status(409).send({ message: "Tooth Number already exists" });
      }

      // Tooth number doesn't exist, proceed with the insertion
      const insertSql = `INSERT INTO teeth_status (patient_id, tooth_number, status) VALUES (?, ?, ?)`;
      connection.query(
        insertSql,
        [patientId, toothNumber, status],
        (insertErr, insertResult) => {
          if (insertErr) {
            return res
              .status(500)
              .send({ message: "Error adding the tooth", error: insertErr });
          }

          res.status(201).send({
            success: true,
            message: "Update successfully",
          });
        },
      );
    },
  );
});

// Teeth Chart update tooth
app.put("/teethChart/:patientId", (req, res) => {
  const patientId = req.params.patientId;
  const { toothNumber, status } = req.body;

  console.log(patientId);
  console.log(toothNumber);
  console.log(status);
  if (!toothNumber || !status) {
    return res
      .status(400)
      .send({ message: "Tooth Number and status are required" });
  }

  // Check if the tooth exists
  const checkIfExistsSql = `SELECT COUNT(*) as count FROM teeth_status WHERE patient_id = ? AND tooth_number = ?`;
  connection.query(
    checkIfExistsSql,
    [patientId, toothNumber],
    (checkErr, checkResult) => {
      if (checkErr) {
        return res
          .status(500)
          .send({ message: "Error checking tooth existence", error: checkErr });
      }

      const toothCount = checkResult[0].count;

      if (toothCount === 0) {
        // Tooth doesn't exist, send an error response
        return res.status(404).send({ message: "Tooth not found" });
      }

      // Tooth exists, proceed with the update
      const updateSql = `UPDATE teeth_status SET status = ? WHERE patient_id = ? AND tooth_number = ?`;
      connection.query(
        updateSql,
        [status, patientId, toothNumber],
        (updateErr, updateResult) => {
          if (updateErr) {
            return res
              .status(500)
              .send({ message: "Error updating the tooth", error: updateErr });
          }

          res.status(200).send({
            success: true,
            message: "Update successful",
          });
        },
      );
    },
  );
});

//Soft Delete Patient Record and all related to it
// Endpoint to soft delete a patient and related records
app.put("/softDeletePatient/:patientId", (req, res) => {
  const patientId = req.params.patientId;

  // Start the transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }

    // Define the queries
    const queries = [
      `UPDATE patient SET is_deleted = 1 WHERE patient_id = ${patientId};`,
      `UPDATE insurance_info SET is_deleted = 1 WHERE patient_id = ${patientId};`,
      `UPDATE health_history SET is_deleted = 1 WHERE patient_id = ${patientId};`,
      `UPDATE visit SET is_deleted = 1 WHERE patient_id = ${patientId};`,
      `UPDATE vital_signs SET is_deleted = 1 WHERE visit_id IN (SELECT visit_id FROM visit WHERE patient_id = ${patientId});`,
      `UPDATE treatment_rendered SET is_deleted = 1 WHERE visit_id IN (SELECT visit_id FROM visit WHERE patient_id = ${patientId});`,
      `UPDATE teeth_status SET is_deleted = 1 WHERE patient_id = ${patientId};`,
      `UPDATE xray SET is_deleted = 1 WHERE patient_id = ${patientId};`,
    ];

    // Execute the queries in a loop
    queries.forEach((query) => {
      connection.query(query, (error, results) => {
        if (error) {
          connection.rollback(() => {
            console.error("Error executing query:", query, error);
            res.status(500).send({ message: "Internal Server Error" });
          });
        }
      });
    });

    // Commit the transaction if all queries succeed
    connection.commit((commitError) => {
      if (commitError) {
        connection.rollback(() => {
          console.error("Error committing transaction:", commitError);
          res.status(500).send({ message: "Internal Server Error" });
        });
      } else {
        res.status(200).send({ message: "Soft delete successful" });
      }
    });
  });
});

//Get visitList
app.get("/visits/:patientID", (req, res) => {
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

  connection.query(sqlQuery, [req.params.patientID], (error, rows, fields) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(rows);
    }
  });
});

//Get vital signs list
app.get("/vital_signs/:visitID", (req, res) => {
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

  connection.query(sqlQuery, [req.params.visitID], (error, rows, fields) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(rows);
    }
  });
});

//Add Visit Post
app.post("/addVisit/:patientId", (req, res) => {
  const patient_id = req.params.patientId;
  const {
    date_visit,
    visit_purpose,
    prescription,
    notes,
    additional_fees,
    discount,
    amount_paid,
    treatments, // Array of selected treatments
  } = req.body;

  console.log(req.body);
  console.log(patient_id);

  const visitInsertQuery = `
        INSERT INTO visit (
            patient_id,
            visit_purpose,
            date_visit,
            additional_fees,
            amount_paid,
            discount,
            prescription,
            notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }

    connection.query(
      visitInsertQuery,
      [
        patient_id,
        visit_purpose,
        date_visit,
        additional_fees,
        amount_paid,
        discount,
        prescription,
        notes,
      ],
      (error, results, fields) => {
        if (error) {
          connection.rollback(() => {
            console.error("Error inserting visit data:", error);
            res
              .status(400)
              .send({ message: "Error: Data incomplete or invalid." });
          });
        } else {
          const visitId = results.insertId;

          // Insert selected treatments into treatment_rendered table
          const treatmentInsertQuery = `INSERT INTO treatment_rendered (visit_id, treatment_id) VALUES (?, ?)`;

          for (let i = 0; i < treatments.length; i++) {
            const treatmentId = treatments[i];

            connection.query(
              treatmentInsertQuery,
              [visitId, treatmentId],
              (treatmentError, treatmentResult) => {
                if (treatmentError) {
                  connection.rollback(() => {
                    console.error("Error inserting treatment:", treatmentError);
                    res
                      .status(400)
                      .send({ message: "Error inserting treatment." });
                  });
                } else {
                  // Handle success if needed
                }
              },
            );
          }

          connection.commit((commitError) => {
            if (commitError) {
              connection.rollback(() => {
                console.error("Error committing transaction:", commitError);
                res.status(500).send({ message: "Internal Server Error" });
              });
            } else {
              res.status(200).send({ message: "Visit added successfully." });
            }
          });
        }
      },
    );
  });
});

app.get("/treatmentDropdownOptions", (req, res) => {
  const sqlQuery = `
    SELECT
        treatment_id,
        treatment_name,
        treatment_fee
    FROM
        treatment;
    `;

  connection.query(sqlQuery, (error, rows, fields) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(rows);
    }
  });
});

// For the vital sign modal
// http://localhost:3000/addVitalSigns
app.post("/addVitalSigns/:visitId", (req, res) => {
  const { temperature, pulse_rate, systolic_bp, diastolic_bp, time_taken } =
    req.body;
  const visit_id = req.params.visitId;
  connection.query(
    "INSERT INTO vital_signs (visit_id, temperature, pulse_rate, systolic_bp, diastolic_bp, time_taken, is_deleted) VALUES (?, ?, ?, ?, ?, ?, 0)",
    [visit_id, temperature, pulse_rate, systolic_bp, diastolic_bp, time_taken],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting vital signs data: " + error.stack);
        res.status(400).send({ message: "Error: Data incomplete or invalid." });
      } else {
        res.status(200).send({ message: "Vital signs added successfully." });
      }
    },
  );
});

app.use("/", authRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
