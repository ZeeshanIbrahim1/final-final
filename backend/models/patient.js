"use strict";
const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static findByDoB(date_of_birth) {
      return Patient.findOne({ where: { date_of_birth,deleted:null } });
    }
    static addPatient(
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
    ) {
      return Patient.create({
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
        date_of_birth,
      });
    }
    static async getAllPatients() {
      try {
        const patients = await Patient.findAll();
        return patients;
      } catch (error) {
        console.error("Error in getAllPatients:", error);
        throw error;
      }
    }
    static async getOnePatient(id){
      console.log("IN getOnePatient")
      try{
        const patient = await Patient.findOne({ where: { id } });
        return patient; 
      }
      catch(error){
        console.log("Error in getOnePatient",error);
        throw error;
      }
    }
    static async updatePatient(
      patientId,
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
      date_of_birth){
        return Patient.update(
          {
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
            date_of_birth,
          },
          {
            where: { id: patientId }
          })
    }
    static async deletePatient(patientId,caseId){
        await Patient.destroy({
          where: {
            id: patientId
          },
        });
    }
    
    static async filterPatient(filterIncoming){

    const {first_name,middle_name,last_name,caseId,categoryName,purposeOfVisit,caseType,dob,practiceLocation,insuranceName,firmName,doa,doctor,page,pageSize} = filterIncoming;
    // Construct the base SQL query
    const offset = ( page - 1) * pageSize;
    console.log("pagination:",offset,page,pageSize,typeof(offset),typeof(page),typeof(pageSize))
    let sql = `
    SELECT DISTINCT
    p.id AS "PatientId",
    p.first_name AS "PatientFirstName",
    p.middle_name AS "PatientMiddleName",
    p.last_name AS "PatientLastName",
    p.date_of_birth AS "Patient_DOB",
    c.id AS "CaseId",
    c.doa AS "CaseDOA",
    ct.categoryName AS "categoryName",
    t.Name AS "caseType",
    l.name AS "practiceLocation",
    a.id AS "AppointmentId",
    i.insuranceName AS "insuranceName",
    f.firmName AS "firmName",
    s.name AS "Speciality",
    pv.PurposeOfVisit AS "purposeOfVisit",
    a.id AS "appointmentId",
    a.appointmentDate AS "appointmentDate", 
    a.appointmentTime AS "AppointmentTime",
    d.first_name AS "doctorFirstName",
    d.middle_name AS "doctorMiddleName",
    d.last_name AS "doctorLastName"
  FROM
    patients p
  INNER JOIN
    cases c ON p.id = c.patientId
  LEFT JOIN
    casetypes t ON c.caseTypeId = t.id
  LEFT JOIN
    categories ct ON c.categoryId = ct.id
  LEFT JOIN
    appointments a ON c.id = a.caseId AND a.deleted IS NULL
  LEFT JOIN
    purposeofvisits pv ON c.purposeOfVisitId = pv.id
  LEFT JOIN
    doctors d ON a.doctorId = d.id
  LEFT JOIN
    firms f ON c.firmId = f.id
  LEFT JOIN
    insurances i ON c.insuranceId = i.id
  LEFT JOIN
    practicelocations l ON c.practiceLocationId = l.id
  LEFT JOIN
    specialties s ON a.specialtyId = s.id
    `;

    // Add WHERE conditions based on filters
    let whereConditions = [];
    console.log(first_name)
    console.log("dobbbbbbbb",dob)
    whereConditions.push(`p.deleted IS NULL AND c.deleted IS NULL`);
    if (first_name) {
      console.log("ddddddddddd", first_name)
      whereConditions.push(`p.first_name LIKE '%${first_name}%'`);
    }
    if(middle_name){
      whereConditions.push(`p.middle_name LIKE '%${middle_name}%'`);
    }
    if(last_name){
      whereConditions.push(`p.last_name LIKE '%${last_name}%'`);
    }
    if (caseId) {
      whereConditions.push(`c.id = '${caseId}'`);
    }
    if(categoryName){
      whereConditions.push(`ct.categoryName LIKE '%${categoryName.trim()}%'`)
    }
    if(purposeOfVisit){
        whereConditions.push(`c.purposeOfVisit LIKE '%${purposeOfVisit}%'`)
    }
    if(caseType){
      whereConditions.push(`t.Name LIKE '%${caseType}%'`)
    }
    if(dob){
      console.log("DATE OF BIRTH",dob)
      whereConditions.push(`p.date_of_birth LIKE '%${dob}%'`)
    }
    if(practiceLocation){
      whereConditions.push(`l.name LIKE '%${practiceLocation}%'`)
    }
    if(insuranceName){
      whereConditions.push(`i.insuranceName LIKE '%${insuranceName}%'` )
    }
    if(firmName){
      whereConditions.push(`f.firmName LIKE '%${firmName}%'`)
    }
    if(doa){
      whereConditions.push(`a.appointmentDate LIKE '%${doa.toISOString().split('T')[0]}%'`)
    }
    if(doctor){
      whereConditions.push(`d.first_name LIKE '%${doctor}%'`)
    }
    if (whereConditions.length > 0) {
      sql += ` WHERE ${whereConditions.join(' AND ')}`;
    }
    sql += ` LIMIT ${pageSize} OFFSET ${offset}`


    console.log("conditonnnnnn", whereConditions)
    // Execute the SQL query
    const results = await sequelize.query(sql);

    return results[0];
  }
  }
  Patient.init(
    {
      first_name: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      date_of_birth: DataTypes.STRING,
      ssn: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      deleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Patient",
      timestamps: false
    }
  );
  return Patient;
};
