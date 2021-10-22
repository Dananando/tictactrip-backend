// dotenv to use the .env file
require('dotenv').config();

const options = {
  swaggerDefinition: {
    info: {
      description: 'An app justifying an amazing text',
      title: 'Tictactrip justify app',
      version: '1.0.0',
    },
    // host: `localhost:${process.env.PORT}`,
    host: 'tictactrip-backend.herokuapp.com',
    basePath: '/v1',
    produces: [
      'application/json',
      'application/xml',
    ],
    schemes: ['http', 'https'],
  },
  basedir: __dirname, // app absolute path
  files: ['../**/*.js', '../*.js'], // Path to the API handle folder
};

module.exports = options;
