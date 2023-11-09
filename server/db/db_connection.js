const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: ""
});

module.exports = db;