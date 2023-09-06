const models = require("../models");

const getAll = async (req, res, next) => {
  try {
    const insurance = await models.Insurance.findAll();
    if (!insurance || insurance.length === 0) {
      return res.status(404).json({ message: "No insurance found." });
    }
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


module.exports = {
  getAll
};