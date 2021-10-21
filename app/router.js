const { Router } = require('express');

const router = Router();

// The controllers
const userController = require('./controllers/userController');
const textController = require('./controllers/textController');

// The authentication middleware
// We chain this middleware on our routes everytime we want to check that a user is connected!
const jwtService = require('./middlewares/jwtMiddleware');

// Test page
router.get('/api', (_, response) => {
  response.send('It\'s running');
});

/* --------------
 AUTHENTICATION/USERS ROUTES
------------------*/
/**
   * User creation endpoint
   * @route POST /api/signup
   * @group User - Operations about users
   * @param {string} email.body.required - email of the created user - eg: user@domain.com
   * @param {string} password.body.required - user's defined password.
   * @returns {object} 200 - An object containing user info
 */
router.post('/api/signup', userController.create);

/**
   * Authentication endpoint
   * @route POST /api/token
   * @group User - Operations about users
   * @param {string} email.body.required - email that wants to connect - eg: user@domain.com
   * @param {string} password.body.required - user password.
   * @returns {object} 200 - An object containing token
 */
router.post('/api/token', userController.login);

// Delete a user endpoint
router.delete('/api/user/:id', jwtService.authenticateToken, userController.delete);

/* --------------
 TEXT ROUTES - Routes handling the text to justify
------------------*/
// Creating and justifying the text
router.post('/api/justify', /* jwtService.authenticateToken, */ textController.createAndJustify);

// Delete a text in the database
router.delete('/api/text/:id', jwtService.authenticateToken, textController.delete);

/* --------------
 404
------------------*/
router.use((request, response) => {
  response.status(404).json(`Endpoint ${request.url} not found`);
});

module.exports = router;
