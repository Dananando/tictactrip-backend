// Require and setup of express
const express = require('express');

const app = express();

// dotenv to use the .env file
require('dotenv').config();

// Where the routes are defined
const router = require('./app/router');

const PORT = process.env.PORT || 4444;

// MW to use the json data the app will send
app.use(express.json());

// MW to read correctly request.body
app.use(express.urlencoded({ extended: true }));

// It is the version 1 of our API
app.use('/v1', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}.`);
});
