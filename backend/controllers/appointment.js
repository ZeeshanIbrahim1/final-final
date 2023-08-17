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
  const {
    appointmentDate,
    appointmentTime,
    appointmentType,
    duration,
    specialtyId,
    doctorId,
    caseId
  } =  req.body;
  console.log(typeof(appointment_date),typeof(appointment_type),typeof(duration))
    await models.Appointment.create({
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      specialtyId,
      doctorId,
      caseId})
    res.status(200).json({ message: "Appointment Added!" });
    next(errors);
};

const getId = async (req, res) => {
  const case_Id = req.params.id;
  const newId = parseInt(case_Id, 10);
  console.log(newId)
  try {
    const appointment = await models.Appointment.findOne({
      attributes: ['id'],
      where: {
        caseId: newId, // Match the 'caseid' column with the provided caseId
      },
    });

    console.log(appointment)
    if (!appointment) {
      return res.status(0);
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getId,
  addAppoint,
//   getAll
};