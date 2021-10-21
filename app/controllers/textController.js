const textDatamapper = require('../datamappers/textDatamapper');

const textController = {
  async createAndJustify(request, response, next) {
    const newTextBody = JSON.parse(request.body);
    console.log(newTextBody);
    try {
      const newText = await textDatamapper.createAndJustify(newTextBody);
      if (newText) {
        response.status(201).json(newText);
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
      const deletedText = await textDatamapper.delete(id);
      if (deletedText) {
        // The id of the deleted text is returned
        response.status(200).json(deletedText);
      } else {
        next();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = textController;
