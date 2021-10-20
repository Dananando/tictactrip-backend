const { Router } = require('express');
const userController = require('./controllers/userController');

const router = Router();

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
router.delete('/api/user/:id', userController.delete);

/* --------------
 404
------------------*/
router.use((request, response) => {
  response.status(404).json(`Endpoint ${request.url} not found`);
});

module.exports = router;
