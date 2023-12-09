const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DENTAL_RECORDS",
});

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to the Database`);
  } else {
    console.log(`Successfully connected to the Database`);
  }
});

module.exports = db;
