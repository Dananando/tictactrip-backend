// The logic linked to the authentication and the login is here!
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtService = {
  JWT_SIGN_SECRET: process.env.JWT_SIGN_SECRET,

  // Generate a token so that the user can login. It is valid for 1h
  generateTokenForUser(userData) {
    return jwt.sign({
      userEmail: userData.email,
    },
    jwtService.JWT_SIGN_SECRET,
    {
      expiresIn: '1h',
    });
  },

  authenticateToken(request, response, next) {
    // We check if the "headers" is empty or not
    // it is supposed to contain the token that was created after log in
    const authHeader = request.headers.authorization;
    let token = [];
    if (authHeader) {
      token = [...authHeader.split(' ')[1]];
    }

    // console.log(token);

    if (token.length === 0) {
      //   console.log('Denied');
      response.status(401).json('Denied');
    }

    // We compare the token in the headers with the secret key of our application
    jwt.verify(token, jwtService.JWT_SIGN_SECRET, (error, userID) => {
      // If there is an error, the token in the headers does not "match" with the secret key
      // We return an error
      if (error) {
        // console.log('Denied');
        response.status(403).json('Denied');
      }
      // If there is no error, we are fine. Let's go to the next middleware
      request.userID = userID;
      next();
    });
  },
};

module.exports = jwtService;
