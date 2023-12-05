const connection = require('../db/db_connection'); // Replace with your actual connection file

const checkUsername = (req, res) => {
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
};

module.exports = { checkUsername };