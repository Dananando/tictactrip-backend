// This object shall contain all the logic related to the text justification

const justifier = {
  // Raw justification function
  ultimateJustificationFunction(text) {
    // A copy of the text to justify
    let textToJustify = text;
    // In this table we will push 80 characters
    const tableToJustify = [];

    // If the input text is below 80 character-length we just return it
    if (textToJustify.length <= 80) {
      return textToJustify;
    }

    // We cut the text to justify 80 characters by 80 characters until it is below 80 characters
    // (mind-blown after repeating '80 characters too many times')
    while (textToJustify.length >= 80) {
      let textToInsert = '';
      // console.log(textToJustify);
      //  we extract the 80 first characters and push them in a table
      textToInsert = textToJustify.slice(0, 80);
      tableToJustify.push(textToInsert);

      // Then, we remove the 80 characters previously pushed
      textToJustify = textToJustify.slice(80, textToJustify.length);
    }
    // Once the text to justify is below 80 characters,
    // we push the remaining characters into the tables containing the 80 characters elements
    tableToJustify.push(textToJustify);

    // Eventually we return the elements of the table and join them with the newline character
    return tableToJustify.join('\n');
  },
};

module.exports = justifier;
