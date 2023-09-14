"use strict";
const { Model, where, and } = require("sequelize");
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
    const offset = ( page ) * pageSize;
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

    console.log(first_name)
    console.log("dobbbbbbbb",dob)
    const andConditions = [];
    const orFNConditions = [];
    const orMNConditions = [];
    const orLNConditions = [];
    const orCategoryConditions = [];
    const orCTConditions = [];
    const orPoVConditions = [];
    const orINConditions = [];
    const orFirmNameConditions = [];
    const orDoctorConditions = [];
    const orPLConditions = [];
    const orConditions = [];
    andConditions.push(`p.deleted IS NULL AND c.deleted IS NULL`);

    if (first_name && first_name.length != 0) {
      for(let i= 0; i< first_name.length; i++ ){
        const name = first_name[i].trim();
        orFNConditions.push(`p.first_name LIKE '%${name}%'`);
      }
      andConditions.push(`(${orFNConditions.join(' OR ')})`);
    }
    if(middle_name && middle_name.length != 0){
      for(let i= 0; i< middle_name.length; i++ ){
        const name = middle_name[i].trim();
        orMNConditions.push(`p.middle_name LIKE '%${name}%'`);
      }
      andConditions.push(`(${orMNConditions.join(' OR ')})`);
    }
    if(last_name && last_name.length != 0){
      for(let i= 0; i< last_name.length; i++ ){
        const name = last_name[i].trim();
        orLNConditions.push(`p.last_name LIKE  '%${name}%'`);
      }
      andConditions.push(`(${orLNConditions.join(' OR ')})`);
    }
    if (caseId) {
      andConditions.push(`c.id = '${caseId}'`);
    }
    if(categoryName && categoryName.length != 0){
      for(let i= 0; i< categoryName.length; i++ ){
        const name = categoryName[i].trim();
        orCategoryConditions.push(`ct.categoryName LIKE  '%${name}%'`);
      }
      andConditions.push(`(${orCategoryConditions.join(' OR ')})`);
    }
    if(purposeOfVisit && purposeOfVisit.length != 0){
      for(let i= 0; i< purposeOfVisit.length; i++ ){
        const name = purposeOfVisit[i].trim();
        orPoVConditions.push(`ct.categoryName LIKE  '%${name}%'`);
      }
      andConditions.push(`(${orPoVConditions.join(' OR ')})`);
    }
    if(caseType && caseType.length != 0 ){
      for(let i= 0; i< caseType.length; i++ ){
        const name = caseType[i].trim();
        orCTConditions.push(`ct.categoryName LIKE  '%${name}%'`);
      }
      andConditions.push(`(${orCTConditions.join(' OR ')})`);
    }
    if(dob){
      console.log("DATE OF BIRTH",dob)
      andConditions.push(`p.date_of_birth LIKE '%${dob}%'`)
    }
    if(practiceLocation && practiceLocation.length != 0){
      for(let i= 0; i< practiceLocation.length; i++ ){
        const name = practiceLocation[i].trim();
        orPoVConditions.push(`l.name LIKE LIKE  '%${name}%'`);
      }
      andConditions.push(`(${orPoVConditions.join(' OR ')})`);
    }
    if(insuranceName && insuranceName.length != 0){
      for(let i= 0; i< insuranceName.length; i++ ){
        const name = insuranceName[i].trim();
        orINConditions.push(`i.insuranceName LIKE '%${name}%'`);
      }
      andConditions.push(`(${orINConditions.join(' OR ')})`);
    }
    if(firmName && firmName.length != 0){
      for(let i= 0; i< firmName.length; i++ ){
        const name = firmName[i].trim();
        orFirmNameConditions.push(`f.firmName LIKE '%${name}%'`);
      }
      andConditions.push(`(${orFirmNameConditions.join(' OR ')})`);
    }
    if(doa){
      andConditions.push(`a.appointmentDate LIKE '%${doa.toISOString().split('T')[0]}%'`)
    }
    if(doctor && doctor.length != 0){
      for(let i= 0; i< doctor.length; i++ ){
        const name = doctor[i].trim();
        orDoctorConditions.push(`d.first_name LIKE '%${name}%'`);
      }
      andConditions.push(`(${orDoctorConditions.join(' OR ')})`);
    }
    if (orConditions.length > 0) {
      andConditions.push(`(${orConditions.join(' OR ')})`);
    }
    if (andConditions.length > 0) {
      sql += ` WHERE ${andConditions.join(' AND ')}`;
    }
    
    sql += ` LIMIT ${pageSize} OFFSET ${offset}`;
    const countSql = `
    SELECT COUNT(*) AS totalRows
    FROM patients p
    INNER JOIN cases c ON p.id = c.patientId
    LEFT JOIN casetypes t ON c.caseTypeId = t.id
    LEFT JOIN categories ct ON c.categoryId = ct.id
    LEFT JOIN appointments a ON c.id = a.caseId AND a.deleted IS NULL
    LEFT JOIN purposeofvisits pv ON c.purposeOfVisitId = pv.id
    LEFT JOIN doctors d ON a.doctorId = d.id
    LEFT JOIN firms f ON c.firmId = f.id
    LEFT JOIN insurances i ON c.insuranceId = i.id
    LEFT JOIN practicelocations l ON c.practiceLocationId = l.id
    LEFT JOIN specialties s ON a.specialtyId = s.id
    WHERE ${andConditions.join(' AND ')}
  `;
  const countResult = await sequelize.query(countSql);
  const totalItems = countResult[0][0].totalRows;
    // Execute the SQL query
    const results = await sequelize.query(sql);
    
    return [ totalItems, results[0] ];
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
