const models = require("../models");
const { validationResult } = require("express-validator");
const statusCodes = require('../helper/statusCode');

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
    duration,
    appointmentTypeId,
    specialtyId,
    doctorId,
    caseId
  } =  req.body;
  console.log(typeof(appointment_date),typeof(appointment_type),typeof(duration))
    await models.Appointment.create({
      appointmentDate,
      appointmentTime,
      duration,
      appointmentTypeId,
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

const type = async (req,res)=>{
  try{
    const typeInfo = await models.AppointmentType.findAll();
    if(typeInfo) {
      res.json(typeInfo);
    }
  else{
    res.status(404).json("No record in Appointment Type");
  }
  }
  catch(error){
    console.log("appointment gettpye",error)
    res.status(401).json({message: "Error getting Appointment Type Information"})
  }
}
const getOneAppointments = async(req,res)=>{
  const appointId = req.params.id;
  const id = parseInt(appointId,10)
  try{
    const appointments = await models.Appointment.findOne({ where: { id, deleted:null } })
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No Appointments found." });
    }
    res.status(200).json(appointments);
  }catch(error){
    console.error("Error in getAppointments", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
const updateAppointment = async(req,res) =>{
    const appointmentId = req.params.id;
    const {
      appointmentDate,
      appointmentTime,
      appointmentTypeId,
      duration,
      specialtyId,
      doctorId,
      caseId
    } =  req.body;
    await models.Appointment.update({
      appointmentDate,
      appointmentTime,
      appointmentTypeId,
      duration,
      specialtyId,
      doctorId,
      caseId
    },{
      where:{id:appointmentId}
    })
}
const getAllAppointment = async(req,res) => {
  let sql = `
  SELECT
    a.id AS "id",
    a.appointmentDate AS "appointmentDate",
    a.appointmentTime AS "appointmentTime",
    a.duration AS "duration",
    t.appointmentType AS "appointmentType",
    s.name AS "speciality",
    d.first_name AS "doctorName",
    a.caseId AS "caseId"
    FROM
    appointments a
    LEFT JOIN 
      appointmenttype t on a.appointmentTypeId = t.id
    LEFT JOIN
      specialties s ON a.specialtyId = s.id
    LEFT JOIN
      doctors d ON a.doctorId = d.id
    WHERE
      a.deleted IS NULL
  `  
  const results = await models.Case.sequelize.query(sql);
  const allAppointments = results[0];
    if(!allAppointments && allAppointments.lenth === 0 ){
      res.json({message: "No Appointment exists"});
    }
    else{
      res.status(201).json(allAppointments);
    }
  } 

 const deleteAppointment = async (req,res) =>{
   const dateStamp = new Date();
  try {
    const id = req.params.id;
    await models.Appointment.update(
      {deleted: dateStamp},
      {where: {id : id}}
    )
    res.status(201).json({message: "Successfully deleted!"})
  } catch (error) {
    console.log("Error in appoint controller:", error)
    res.status(406).json({message: "Error in deleting the appointment"});
  }
 }

module.exports = {
  getId,
  addAppoint,
  type,
  getOneAppointments,
  updateAppointment,
  getAllAppointment,
  deleteAppointment
//   getAll
};