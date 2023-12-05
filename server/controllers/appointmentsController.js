const connection = require('../db/db_connection');

exports.addAppointment = (req, res) => {
    console.log(req.body);
    const sql = `INSERT INTO appointment (date_schedule, time_schedule, name, contact_number, purpose) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [req.body.date, req.body.timeSchedule, req.body.name, req.body.contactNumber, req.body.purpose], (err, rows) => {
        if (err) {
            res.send({message: "Error cannot add appointment"});
        } else {
            res.send({message: "Successfully Added"})
        }
    })
}

exports.getAppointments = (req, res) => {
    const sql = `SELECT * FROM appointment`;
    connection.query(sql, (err, rows) => {
        if (err) {
            res.send({message: "Error fetching the data"});
        } else {
            res.send(rows);
        }
    })
}