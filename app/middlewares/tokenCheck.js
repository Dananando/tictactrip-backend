// This object shall check if the token has expired or not
// and if the limit of 80k characters a day has been reached

const tokenCheck = {
  // Checking if token is expired and if the character limit is reached
  charAndExpirationCheck(request, response, next) {
    console.log('In checkExpiration. userEmail : ', request.session.userEmail);
    console.log(request.session.userEmail.exp - (Math.floor(Date.now() / 1000)));
    // Comparing NOW() with the expiration date of the token
    if (request.session.userEmail.exp - (Math.floor(Date.now() / 1000)) > 0) {
      if (Number(request.session.userEmail.charCount) <= 80000) {
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

module.exports = tokenCheck;
