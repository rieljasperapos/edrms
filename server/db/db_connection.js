const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dental_records3'
});

db.connect((err) => {
    if (err) {
        console.log(`Error connecting to the Database`);
    } else {
        console.log(`Successfully connected to the Database`);
    }
})

module.exports = db;