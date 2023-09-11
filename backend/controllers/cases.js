const { sequelize } = require("../models/index")
const models = require("../models");
const { validationResult } = require("express-validator");
const { all } = require("../routes/cases");

const addCase = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log("Error in AddCase controllers/auth.js");
    res.json("ADD Case NOT WORKING!");
  }
  const {
    purposeOfVisitId,
    doa,
    firmId,
    insuranceId,
    patientId,
    practiceLocationId,
    caseTypeId,
    categoryId,
  } = req.body;

  const caseStored = await models.Case.create({
    doa,
    firmId,
    insuranceId,
    patientId,
    practiceLocationId,
    caseTypeId,
    categoryId,
    purposeOfVisitId,
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
  console.error("Error in getAllCases:", error);
  res.status(500).json({ message: "Internal server error." });
  next(error)
}
}

const updateCase = async (req, res) => { 
  console.log("aaaaaaaaaaa:",req.body);
  const caseId = req.params.id;
  console.log("CASE id and its type:",caseId,typeof(caseId))
  const {
    practiceLocationId,
    categoryId,
    purposeOfVisit,
    caseTypeId,
    doa,
    insuranceId,
    firmId} = req.body;
    console.log("FIRRRRRRRRRRRRM IDDDDDDD:",firmId,typeof(firmId))
    const oneCase = await models.Case.getOneCase(id);
    if(oneCase){
      await models.Case.updateCase(
        caseId,
        purposeOfVisit,
        doa,
        firmId,
        insuranceId,
        practiceLocationId,
        caseTypeId,
        categoryId,
        );
        res.status(201).json({ message: "Case updated!" });
    }
    else{
      res.status(404).josn({message: "No Case found."})
    }
}
 
const getVisit = async (req,res,next)=>{
  try{
    const extractedInfo = await models.PurposeOfVisit.findAll();
    console.log("Purpose of visit : ", extractedInfo)
    if(extractedInfo) {
        res.json(extractedInfo);
    }
    else{
      res.status(400).json("No record in Purpose of visit");
    }
  }catch(errors){
      console.log("Error in Cases Controller / getVisit",errors)
      res.json({ message: "Internal server error."})
  }
}

const getAll = async (req,res) => {
  let sql = `
  SELECT
    c.id AS "caseId",
    c.doa AS "caseDOA",
    f.firmName AS "firmName",
    i.insuranceName AS "insuranceName",
    l.name AS "practiceLocation",
    t.Name AS "caseType",
    ct.categoryName AS "categoryName",
    pv.PurposeOfVisit AS "purposeOfVisit"
  FROM 
    cases c
  LEFT JOIN
    casetypes t ON c.caseTypeId = t.id
  LEFT JOIN
    categories ct ON c.categoryId = ct.id
  LEFT JOIN
    purposeofvisits pv ON c.purposeOfVisitId = pv.id
  LEFT JOIN
    firms f ON c.firmId = f.id
  LEFT JOIN
    insurances i ON c.insuranceId = i.id
  LEFT JOIN
    practicelocations l ON c.practiceLocationId = l.id
  `;
  let whereConditions = [];
  whereConditions.push(`c.deleted IS NULL`);
  sql += ` WHERE ${whereConditions.join(' AND ')};`;
    const results = await models.Case.sequelize.query(sql);
    const allCases = results[0];
    if(allCases){
      console.log("In cases controller:", allCases)
      res.status(201).json(allCases);
    }
    else{
      res.json({message:"No Case exists!"})
    }
}

const deleteCase = async(req,res) => {
  const caseId = req.params.id;
  const dateStamp = new Date();
  const appointmentsExist = await models.Appointment.findOne({
    where: { 
      caseId ,
      deleted: null
    }
  });
  if(appointmentsExist){
    res.status(409).json({message:"To delete this case, first delete its appointments."})
  }
  else{
    try {
      await models.Case.update(
      { deleted : dateStamp },
      {where:{id:caseId}}
    )
      res.status(201).json({message : "Cases Successfuly deleted!"})
    } catch (error) {
      console.log("ERROR IN BACKEND CONTROLLERS deleting Patient:", error)
      res.json(400).json({message:"Server Error"})
    }
  }
}

module.exports = {
  addCase,
  getCase,
  updateCase,
  getVisit,
  getAll,
  deleteCase
};