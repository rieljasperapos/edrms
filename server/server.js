const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})
