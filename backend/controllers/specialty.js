const models = require("../models");
const getAll = async (req, res, next) => {
  try {
    const Specialty = await models.Specialty.findAll();
    if (!Specialty || Specialty.length === 0) {
      return res.status(404).json({ message: "No Specialty found." });
    }
    res.status(200).json(Specialty);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


module.exports = {
  getAll
};