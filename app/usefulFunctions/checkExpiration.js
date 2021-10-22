// This object shall check if the token has expired or not
// and if the limit of 80k characters a day has been reached

const checkExpiration = {
  // Checking if token is expired and if the character limit is reached
  isTokenExpired(request, response, next) {
    // Comparing NOW() with the expiration date of the token
    if ((Math.floor(Date.now() / 1000)) - request.email.exp > 0) {
      if (request.userEmail.charCount <= 80000) {
        next();
      } else {
        // $ £ € Ask for payment! $ £ €
        response.status(402).json('Payment Required')
      }
    } else {
      // If the expiration date is before NOW(), just go to the next middleware
      next();
    }
  },
};

module.exports = checkExpiration;
