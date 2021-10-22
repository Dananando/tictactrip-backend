const justifier = require('../usefulFunctions/justifier');

const characterCountMiddleware = {
  countingCharacters(request, _, next) {
    const newTextBody = JSON.parse(request.body);
    const newTextBodyCount = justifier.ultimateJustificationFunction(newTextBody).length;
    if (!request.userEmail.charCount) {
      request.userEmail.charCount = 0;
    }

    request.userEmail.charCount += newTextBodyCount;

    next();
  },
};

module.exports = characterCountMiddleware;
