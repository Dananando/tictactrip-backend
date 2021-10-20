// This object shall contain all the logic related to the text justification

const justifier = {
  ultimateJustificationFunction(textToJustify) {
    // blabla
    const tableToJustify = [];
    if (textToJustify.length <= 80) {
      return textToJustify;
    }

    while (textToJustify.length >= 80) {
      let textToInsert = '';
      // console.log(textToJustify);
      if (textToJustify.length >= 80) {
        textToInsert = textToJustify.substring(0, 80);
        tableToJustify.push(textToInsert);
        textToJustify = textToJustify.slice(80, textToJustify.length);
      } else {
        tableToJustify.push(textToJustify);
      }
    }
    tableToJustify.push(textToJustify);
    // tableToJustify.forEach((word) => `${word} \n`);
    return tableToJustify.join(' \n');
  },
};

module.exports = justifier;
