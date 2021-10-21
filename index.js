// Require and setup of express
const express = require('express');

const app = express();

// Module to read content text/plain
const bodyParser = require('body-parser');

// CORS MW
const cors = require('cors');

// Swagger import and configuration below for API documentation
const expressSwagger = require('express-swagger-generator')(app);
const swaggerOptions = require('./app/swagger-options/swagger-options');

// dotenv to use the .env file
require('dotenv').config();

// Where the routes are defined
const router = require('./app/router');

const PORT = process.env.PORT || 4444;

// Using our swagger options in order to document the app
expressSwagger(swaggerOptions);

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
