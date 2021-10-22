const justifier = require('../usefulFunctions/justifier');

const characterCountMiddleware = {
  // Storing the character count entered per token
  countingCharacters(request, _, next) {
    console.log('In character count. userEmail : ', request.session.userEmail);
    // console.log('Request.session : ', request.session);
    const newTextBody = JSON.parse(request.body);
    const newTextBodyCount = justifier.ultimateJustificationFunction(newTextBody).length;
    if (!request.session.userEmail.charCount) {
      request.session.userEmail.charCount = 0;
    }

    request.session.userEmail.charCount += newTextBodyCount;

    next();
  },
};

module.exports = characterCountMiddleware;
