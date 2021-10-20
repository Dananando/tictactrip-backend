const database = require('../database');

const justifier = require('../usefulFunctions/justifier');

const textDatamapper = {
  // Creation of a user
  async createAndJustify(text) {
    // Prepared query to avoid SQL injection and to insert the user data
    const query = {
      text: 'INSERT INTO "text" (content) VALUES ($1) RETURNING id, content;',
      values: [text.content],
    };

    try {
      const { rows } = await database.query(query);
      const textToJustify = rows[0];
      if (textToJustify) {
        // HERE INSERT LOGIC TO JUSTIFY TEXT
        return justifier.ultimateJustificationFunction(textToJustify);
      }
      return 'Error during text creation/justification.';
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Deleting a text from DB
  async delete(id) {
    const query = {
      text: 'DELETE FROM "text" WHERE id = $1 RETURNING id;',
      values: [id],
    };

    try {
      const { rows } = await database.query(query);
      // console.log('Rows[0] : ', rows[0]);
      return rows[0];
    } catch (error) {
      // console.trace(error);
      throw new Error(error.message);
    }
  },
};

module.exports = textDatamapper;
