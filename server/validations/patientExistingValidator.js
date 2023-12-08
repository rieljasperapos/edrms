const connection = require('../db/db_connection');
const express = require('express');

const checkPatientExist = (req, res) => {
    const sql = `SELECT patient_id FROM patient WHERE CONCAT(last_name, ', ', first_name, ' ', middle_name) = ?`;
    connection.query(sql, [req.body.name], (err, rows) => {
        if (rows.length == 0) {
            res.send({message: "Patient didnt exist", exist: false});
        } else {
            res.send({message: "Patient Exists", exist: true});
        }
    })
}

module.exports = { checkPatientExist };