const connection = require("../db/db_connection");

exports.addAppointment = (req, res) => {
  let patientId;
  let isPrevious;
  connection.query(
    `SELECT patient_id 
   FROM patient 
   WHERE CONCAT(last_name, ', ', first_name, ' ', middle_name) = ? OR CONCAT(last_name, ', ', first_name) = ?`,
    [req.body.name, req.body.name], // Add missing square brackets for parameters
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
          [
            req.body.date,
            req.body.timeSchedule,
            req.body.name,
            req.body.contactNumber,
            req.body.purpose,
            isPrevious || 0,
            patientId || null,
          ],
          (err, rows) => {
            if (err) {
              res.send({ message: "Error cannot add appointment" });
            } else {
              res.send({ message: "Successfully Added" });
            }
          },
        );
      }
    },
  );
};

exports.getAppointments = (req, res) => {
  const sql = `SELECT * FROM appointment ORDER BY time_schedule ASC`;
  connection.query(sql, (err, rows) => {
    if (err) {
      res.send({ message: "Error fetching the data" });
    } else {
      res.send(rows);
    }
  });
};

exports.editAppointment = (req, res) => {
  console.log(req.params.appointmentId);
  const sql = `UPDATE appointment 
        SET date_schedule = ?, time_schedule = ?, name = ?, contact_number = ?, purpose = ?, status = ?
        WHERE appointment_id = ?`;
  console.log(req.body);
  console.log(req.params.appointmentId);

  const status = req.body.status || "Confirmed";

  connection.query(
    sql,
    [
      req.body.date,
      req.body.timeSchedule,
      req.body.name,
      req.body.contactNumber,
      req.body.purpose,
      status,
      req.params.appointmentId,
    ],
    (err, rows) => {
      if (err) {
        res.send({ message: "Error cannot update" });
      } else {
        res.send({ message: "Updated Successfully" });
      }
    },
  );
};

exports.getAppointmentsById = (req, res) => {
  console.log(req.params.appointmentId);
  const sql = `SELECT * FROM appointment WHERE appointment_id = ?`;
  connection.query(sql, [req.params.appointmentId], (err, rows) => {
    if (err) {
      res.send({ message: "Error" });
    } else {
      res.send(rows);
    }
  });
};

exports.getTotalAppointmentsCancelled = (req, res) => {
  const sql = `SELECT COUNT(*) AS totalCancelled FROM appointment WHERE status = ? AND date_schedule = ?`;
  console.log(req.body);

  connection.query(sql, [req.body.status, req.body.date], (err, rows) => {
    if (rows.length > 0) {
      console.log("Total Cancelled Appointments:", rows[0].totalCancelled);
      res.status(200).json({ totalCancelled: rows[0].totalCancelled });
    } else {
      console.log("No cancelled appointments found");
      res.status(200).json({ totalCancelled: 0 });
    }
  });
};

exports.getTotalAppointmentsConfirmed = (req, res) => {
  const sql = `SELECT COUNT(*) AS totalConfirmed FROM appointment WHERE status = ? AND date_schedule = ?`;
  console.log(req.body);

  connection.query(sql, [req.body.status, req.body.date], (err, rows) => {
    if (rows.length > 0) {
      console.log("Total Confirmed Appointments:", rows[0].totalConfirmed);
      res.status(200).json({ totalConfirmed: rows[0].totalConfirmed });
    } else {
      console.log("No confirmed appointments found");
      res.status(200).json({ totalConfirmed: 0 });
    }
  });
};
