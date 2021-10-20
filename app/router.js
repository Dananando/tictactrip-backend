const { Router } = require('express');

const router = Router();

// Test page
router.get('/', (_, response) => {
  response.send('It\'s running');
});

// Route 404
router.use((request, response) => {
  response.status(404).json(`Endpoint ${request.url} not found`);
});

module.exports = router;
