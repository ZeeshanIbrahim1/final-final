const models = require("../models");
const getAll = async (req, res, next) => {
  try {
    const Firms = await models.Firm.findAll();
    if (!Firms || Firms.length === 0) {
      return res.status(404).json({ message: "No Firms found." });
    }
    res.status(200).json(Firms);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


module.exports = {
  getAll
};