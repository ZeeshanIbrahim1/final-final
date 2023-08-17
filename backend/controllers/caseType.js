const models = require("../models");
const getAll = async (req, res, next) => {
  try {
    const caseType = await models.CaseType.findAll();
    if (!caseType || caseType.length === 0) {
      return res.status(404).json({ message: "No Firms found." });
    }
    res.status(200).json(caseType);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = {
  getAll
};