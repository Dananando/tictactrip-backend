const { Router } = require('express');

const router = Router();

// The controllers
const userController = require('./controllers/userController');
const textController = require('./controllers/textController');

// The authentication middleware
const jwtService = require('./middlewares/jwtMiddleware');

// Test page
router.get('/api', (_, response) => {
  response.send('It\'s running');
});

/* --------------
 AUTHENTICATION/USERS ROUTES
------------------*/
// User creation endpoint
router.post('/api/signup', userController.create);

// Authentication endpoint
router.post('/api/token', userController.login);

// Delete a user endpoint
router.delete('/api/user/:id', jwtService.authenticateToken, userController.delete);

/* --------------
 TEXT ROUTES - Routes handling the text to justify
------------------*/
// Creating and justifying the text
router.post('/api/justify', jwtService.authenticateToken, textController.createAndJustify);

// Delete a text in the database
router.delete('/api/text/:id', jwtService.authenticateToken, textController.delete);

/* --------------
 404
------------------*/
router.use((request, response) => {
  response.status(404).json(`Endpoint ${request.url} not found`);
});

module.exports = router;
