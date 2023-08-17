const models = require("../models");
const { validationResult } = require("express-validator");

const addPatient = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log("Error in AddPatient controllers/auth.js", req.body);
    res.json("ADD PATIENT NOT WORKING!");
  }
  const {
    first_name,
    middle_name,
    last_name,
    email,
    ssn,
    address,
    city,
    state,
    gender,
    zip,
    date_of_birth
  } = req.body;
  console.log("dateofBirth", date_of_birth, typeof(date_of_birth))
  const storedDoB = await models.Patient.findByDoB(date_of_birth);

  if (storedDoB) {
    console.log("Patient with same Date of Birth already exists!");
    res
      .status(400)
      .json(console.log("Patient with same Date of Birth already exists!!"));
    return 0;
  }
  const patientStored = await models.Patient.create({
    first_name,
    middle_name,
    last_name,
    email,
    ssn,
    address,
    city,
    state,
    gender,
    zip,
    date_of_birth
  });
  console.log(patientStored.id)
  res.status(201).json(patientStored.id);

  next(errors);
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await models.Patient.findAll({
      include: [
        {
          model: models.Case,
          include: [
            models.Firm,
            models.Insurance,
            models.PracticeLocation,
            models.Category,
            models.CaseType,
            // {
            //   model: models.Appointment,
            //   include: [models.Specialty, models.Doctors],
            // },
          ],
        },
      ],
    });

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found." });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error in getAllPatients:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPatient = async (req, res, next)=>{
  const patientId = req.params.id;
  console.log("IN controllers/getPatient : ", typeof(patientId))
  try{
  const patient = await models.Patient.getOnePatient(patientId);
  if (!patient || patient.length === 0) {
    return res.status(404).json({ message: "No patients found." });
  }
  res.status(200).json(patient);
}
 catch (error) {
  console.error("Error in getAllPatients:", error);
  res.status(500).json({ message: "Internal server error." });
  next(error)
}
}

const updatePatient = async (req, res) => { 
  const patientId = req.params.id;
  const {first_name,middle_name,last_name,email,ssn,address,city,state,gender,zip,date_of_birth} = req.body;
  await models.Patient.updatePatient(patientId,first_name,middle_name,last_name,email,ssn,address,city,state,gender,zip,date_of_birth);
  res.status(201).json({ message: "Patient updated!" });
 }

const deletePatient = async (req, res) => { 
  const patientId = req.params.id;
  try{
    await models.Patient.deletePatient(patientId);
    res.status(201).json({ message: " Patient Successfully Destroyed! "})
  }
  catch(error){
    console.log("ERROR IN BACKEND CONTROLLERS:",error)
  }
}

module.exports = {
  addPatient,
  updatePatient,
  getPatient,
  deletePatient,
  getAllPatients
};