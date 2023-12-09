const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const sessionSecret = uuidv4();

const sessionConfig = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000,
  },
};

module.exports = sessionConfig;
