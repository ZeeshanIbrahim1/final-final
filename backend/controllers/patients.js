const { sequelize } = require("../models/index");
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
  const storedDoB = await models.Patient.findByDoB(date_of_birth);

  if (storedDoB) {
    console.log("Patient with same Date of Birth already exists!");
    res
      .status(401)
      .json(console.log("Patient with same Date of Birth already exists!!"));
    return 0;
  }
  const patientStored = await models.Patient.addPatient(first_name,
    middle_name,
    last_name,
    email,
    ssn,
    address,
    city,
    state,
    gender,
    zip,
    date_of_birth)
  console.log(patientStored.id)
  res.status(201).json(patientStored.id);

  next(errors);
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
  console.error("Error in getPatients:", error);
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
  try{
    const caseId = req.params.id1;
    const AppointId = req.params.id2;
    const patientId = req.params.id3;
    const appointmentsExist = await models.Appointment.findOne({
      where: { caseId ,
        deleted: null
      }
    });
  if(appointmentsExist){
    res.status(400).json({message:"To delete this case, first delete its appointments."})
  }
  else{
    const deletionTimestamp = new Date();
    console.log("In deleteeeeeeeeeeeeeee: date :", deletionTimestamp)
    await models.Case.update(
      { deleted: deletionTimestamp }, // Set the deleted column to the timestamp
      { where: { id: caseId }  },
      );
        res.status(201).json({ message: " Patient Successfully Destroyed! "})
      }
  }
  catch(error){
    console.log("ERROR IN BACKEND CONTROLLERS:",error)
  }
}

const deleteOne = async (req, res) =>{
  const transaction = await sequelize.transaction();
  const patientId = req.params.id;
  const deletionTimestamp = new Date();
  try{
    const caseExists = await models.Case.findOne(
      {where: {deleted: null,patientId: patientId}}
      )
    if(caseExists){
      res.status(401).json({message : "To delete this patient: First DELETE all cases of this Patient."})
    }
    else{
      await models.Patient.update(
        {deleted: deletionTimestamp},
        {where:{id : patientId},transaction})
      transaction.commit()
      res.status(200).json({message:"Patient Successfully deleted"})
        }
  }catch(error){
    transaction.rollback()
    console.log("ERROR IN BACKEND CONTROLLERS deleting Patient:",error)
  }

}

const filterData = async (req , res) =>{
  const filters = req.query;
  console.log("filters Incoming:",filters)
  try {
    const patient = await models.Patient.filterPatient(filters);
    console.log("Data recieving after aplying filter:",patient )
    if (!patient || patient.length === 0) {
      return res.json(["No such data with filter exists"]);
    }
    res.status(200).json(patient);
  }catch(error){
  console.error("Error in filterData:", error);
  res.status(500).json({ message: "Internal server error." });
  }
}

const getPatientAll = async(req,res)=>{
  const allPatients = await models.Patient.findAll(
    {where: {deleted: null}}
    );
  if(!allPatients && allPatients.length === 0 ){
    res.json({message : "No Patient exists" })
  }
  else{
    res.status(201).json(allPatients)
  } 
}
const updateAll = async (req,res) => {
  const {patientData,caseData,appointmentData} = req.body;
  const transaction = await sequelize.transaction()
  try {
    // Update Patient
    const patientId = parseInt(patientData.id,10)
    const caseId = parseInt(caseData.id,10)
    
    // console.log("idsss",patientId,appointmentData.id,caseId)
    await models.Patient.update(patientData, {where: {id:patientId}, transaction });

    // Update Case
    await models.Case.update(caseData, {where: {id:caseId}, transaction });

    // Update Appointment
    if(appointmentData != null){
      await models.Appointment.update(appointmentData, {where: {id:appointmentData.id}, transaction });
    }

    // Commit the transaction
    await transaction.commit();

    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    // Rollback the transaction on error
    await transaction.rollback();
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'An error occurred while updating data' });
  }
}

module.exports = {
  addPatient,
  updatePatient,
  getPatient,
  deletePatient,  
  filterData,
  getPatientAll,
  deleteOne,
  updateAll
};