const userDatamapper = require('../datamappers/userDatamapper');

const userController = {
  async create(request, response, next) {
    const newUserBody = request.body;
    try {
      const newUser = await userDatamapper.create(newUserBody);
      if (newUserBody) {
        response.status(201).json(newUser);
      } else {
        next();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async login(request, response, next) {
    const userLoggedBody = request.body;
    try {
      const userLogged = await userDatamapper.login(userLoggedBody);
      if (userLogged) {
        // A token is returned if the log in is successful
        response.status(200).json(userLogged);
      } else {
        next();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async delete(request, response, next) {
    const id = Number(request.params.id);
    try {
      const deletedUser = await userDatamapper.delete(id);
      if (deletedUser) {
        // The id of the deleted user is returned
        // console.log('deleted user : ', deletedUser);
        response.status(200).json(deletedUser);
      } else {
        next();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = userController;
