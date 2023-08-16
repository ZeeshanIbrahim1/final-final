const models = require("../models");
const { validationResult } = require("express-validator");

const addAppoint= async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log("Error in AddAppoint controllers/auth.js");
    res.json("ADD Appoinmtment NOT WORKING!");
  }
  const {appointmentDate,appointmentTime,appointmentType,duration} =  req.body;
  console.log(typeof(appointment_date),typeof(appointment_type),typeof(duration))
    await models.Appointment.create({appointmentDate,appointmentTime,appointmentType,duration})
    res.status(200).json({ message: "Appointment Added!" });
    next(errors);
};

// const getById = async (req, res) => {
//   const practiceId = req.params.id;
//   try {
//     const firms = await models.Firm.findByPk(practiceId);
//     if (!practiceId) {
//       return res.status(404).json({ message: 'Firms not found' });
//     }
//     res.json(practiceId);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
module.exports = {
//   getById,
  addAppoint,
//   getAll
};