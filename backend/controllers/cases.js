const models = require("../models");
const { validationResult } = require("express-validator");

const addCase = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log("Error in AddCase controllers/auth.js");
    res.json("ADD Case NOT WORKING!");
  }
  const {
    firmId,
    patientId,
    insuranceId,
    practiceLocationId,
    category,
    purposeOfVisit,
    caseType,
    doa,
  } = req.body;

  const caseStored = await models.Case.create({
    category,
    purposeOfVisit,
    caseType,
    doa,
    firmId,
    insuranceId,
    practiceLocationId,
    patientId
  });
  console.log("Stored Case ID:", caseStored.id);
  res.status(201).json(caseStored.id);

  next(errors);
};

const getCase = async (req,res, next) =>{
  const caseId = req.params.id;
  console.log("IN controllers/getCase : ", typeof(caseId))
  const id = parseInt(caseId,10);
  console.log("id type", typeof(id))
  try{
  const cases = await models.Case.getOneCase(id);
  if (!cases || cases.length === 0) {
    return res.status(404).json({ message: "No cases found." });
  }
  res.status(200).json(cases);
}
 catch (error) {
  console.error("Error in getAllPatients:", error);
  res.status(500).json({ message: "Internal server error." });
  next(error)
}
}

const updateCase = async (req, res) => { 
  const caseId = req.params.id;
  const {firmId,
    patientId,
    insuranceId,
    practiceLocationId,
    practiceLocation,
    category,
    purposeOfVisit,
    caseType,
    doa,
    insuranceName,
    insuranceCity,
    insuranceState,
    insuranceZip,
    firmName,
    firmCity,
    firmState,
    firmZip,} = req.body;
  await models.Patient.updatePatient(
    caseId,
    firmId,
    patientId,
    insuranceId,
    practiceLocationId,
    practiceLocation,
    category,
    purposeOfVisit,
    caseType,
    doa,
    insuranceName,
    insuranceCity,
    insuranceState,
    insuranceZip,
    firmName,
    firmCity,
    firmState,
    firmZip);
  res.status(201).json({ message: "Case updated!" });
 }

module.exports = {
  addCase,
  getCase,
  updateCase
};