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
      .status(400)
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
  const transaction = await sequelize.transaction() 
  
  try{
  const caseId = req.params.id1;
  const AppointId = req.params.id2;
  const patientId = req.params.id3;
  const deletionTimestamp = new Date();
    // await models.Patient.destroy({
    //   where:{
    //     id : patientId
    //   }
    // })
    console.log("In deleteeeeeeeeeeeeeee: date :", deletionTimestamp)
    await models.Case.update(
      { deleted: deletionTimestamp }, // Set the deleted column to the timestamp
      { where: { id: caseId },transaction  },
    );

    await models.Appointment.update(
      { deleted: deletionTimestamp },
      { where: { id: AppointId },transaction  });
    await transaction.commit();
    res.status(201).json({ message: " Patient Successfully Destroyed! "})
  }
  catch(error){
    await transaction.rollback();
    console.log("ERROR IN BACKEND CONTROLLERS:",error)
  }
}

const deleteOne = async (req, res) =>{
  const transaction = await sequelize.transaction();
  const patientId = req.params.id;
  const deletionTimestamp = new Date();
  try{
    await models.Patient.update(
      {deleted: deletionTimestamp},
      {where:{id : patientId},transaction}
    )
    await models.Case.update({
      deleted: deletionTimestamp},
      {where: {patientId: patientId},transaction}
      )
    transaction.commit()
    res.json("Patient Successfully deleted")
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

module.exports = {
  addPatient,
  updatePatient,
  getPatient,
  deletePatient,  
  filterData,
  getPatientAll,
  deleteOne
};