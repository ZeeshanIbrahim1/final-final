const models = require("../models");
const getAll = async (req, res, next) => {
  try {
    const practicelocation = await models.PracticeLocation.findAll();
    // console.log("IN CONTROLLERS PRACtice location", practicelocation)
    if (!practicelocation || practicelocation.length === 0) {
      return res.status(404).json({ message: "No Firms found." });
    }
    res.status(200).json(practicelocation);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

const getById = async (req, res) => {
  const practiceId = req.params.id;
  try {
    const firms = await models.Firm.findByPk(practiceId);
    if (!practiceId) {
      return res.status(404).json({ message: 'Firms not found' });
    }
    res.json(practiceId);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getById,
  getAll
};