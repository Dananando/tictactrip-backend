const bcrypt = require('bcrypt');

const database = require('../database');

const jwtService = require('../middlewares/jwtMiddleware');

const userDatamapper = {
  // Creation of a user
  async create(user) {
    // configuring the salt then hashing the password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    // Prepared query to avoid SQL injection and to insert the user data
    const query = {
      text: 'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id, email;',
      values: [user.email, hashedPassword],
    };

    try {
      const { rows } = await database.query(query);
      if (rows[0]) {
        return rows[0];
      }
      return 'Error during user creation.';
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Allowing (or not) the user to login
  async login(user) {
    const query = {
      text: 'SELECT * FROM "user" WHERE email = $1',
      values: [user.email],
    };

    try {
      // First check whether or not the user exists
      const { rows } = await database.query(query);
      const foundUser = rows[0];
      // console.log('Found user : ', foundUser);
      if (rows[0]) {
        const passwordMatch = bcrypt.compareSync(user.password, foundUser.password);
        // console.log('match : ', match);
        if (passwordMatch === true) {
          const token = {
            logged: true,
            id: jwtService.generateTokenForUser(foundUser),
            email: user.email,
          };
          // console.log('The token : ', token);
          return {
            email: token.email,
            id: token.id,
          };
        }
        return 'Wrong password. Please try again.';
      }
      return 'Email not found. Please try again.';
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Deleting a user from DB
  async delete(id) {
    const query = {
      text: 'DELETE FROM "user" WHERE id = $1 RETURNING id;',
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

module.exports = userDatamapper;
