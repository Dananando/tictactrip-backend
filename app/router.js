const { Router } = require('express');

const router = Router();

// The controllers
const userController = require('./controllers/userController');
const textController = require('./controllers/textController');

// The authentication middleware
// We chain this middleware on our routes everytime we want to check that a user is connected!
const jwtService = require('./middlewares/jwtMiddleware');

// MW checking if the token has expired and if the word count is above 80k
const tokenCheck = require('./middlewares/tokenCheck');

// MW inputing the character count in request.userEmail.charCount
const characterCountMiddleware = require('./middlewares/characterCountMiddleware');

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

/**
   * Delete a user endpoint (must authenticate first)
   * @route DELETE /api/user/{id}
   * @group User - Operations about users
   * @param {number} id.path.required - id of the user you want to delete
   * @returns {number} 200 - The id of the deleted user
 */
router.delete('/api/user/:id', jwtService.authenticateToken, userController.delete);

/* --------------
 TEXT ROUTES - Routes handling the text to justify
------------------*/
/**
   * Create and justify a text endpoint (must authenticate first)
   * @route POST /api/justify
   * @group Text - Operations about text to justify
   * @param {string} text.body.required - text to justify
   * @returns {string} 201 - Returns the justified string
 */
router.post('/api/justify', jwtService.authenticateToken, characterCountMiddleware.countingCharacters, tokenCheck.charAndExpirationCheck, textController.createAndJustify);

/**
   * Delete a text in the database (must authenticate first)
   * @route DELETE /api/text/{id}
   * @group Text - Operations about text to justify
   * @param {number} id.path.required - id of the text you want to delete
   * @returns {number} 200 - The id of the deleted text
 */
router.delete('/api/text/:id', jwtService.authenticateToken, textController.delete);

/* --------------
 404
------------------*/
router.use((request, response) => {
  response.status(404).json(`Endpoint ${request.url} not found`);
});

module.exports = router;
