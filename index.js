// Require and setup of express
const express = require('express');

const app = express();

// Module to read content text/plain
const bodyParser = require('body-parser');

// CORS MW
const cors = require('cors');

// Express-session
const session = require('express-session');

// Swagger import and configuration below for API documentation
const expressSwagger = require('express-swagger-generator')(app);
const options = require('./app/swagger-options/swagger-options');

// dotenv to use the .env file
require('dotenv').config();

// Where the routes are defined
const router = require('./app/router');

const PORT = process.env.PORT || 4444;

// Using our swagger options in order to document the app
expressSwagger(options);

// Use of session to store the word count
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// Any app can access our API /!\
app.use(cors({
  origin: '*',
}));

// MW to use the json data the app will send
app.use(express.json());

// MW to read correctly request.body with url encoded content
app.use(express.urlencoded({ extended: true }));

// MW to read content text/plain correctly
app.use(bodyParser.text({ type: 'text/*' }));

// It is the version 1 of our API
app.use('/v1', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}.`);
});

module.exports = app;
