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
      return Patient.findOne({ where: { date_of_birth } });
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
    static async deletePatient(patientId){
        await Patient.destroy({
          where: {
            id: patientId
          },
        });
    }
    static async filterPatient(filterIncoming){
    const {firstName,middleName,lastName,caseId,categoryName,purposeOfVisit,caseType,dob,practiceLocation,insuranceName,firmName,doa,doctor,} = filterIncoming;
    // Construct the base SQL query
    let sql = `
    SELECT
    p.*,
    c.*,
    t.*,
    ct.*,
    d.*,
    f.*,
    i.*,
    a.*,
    l.*,
    s.*
  FROM
    patients p
  LEFT JOIN
    cases c ON p.id = c.patientId
  LEFT JOIN
    Casetypes t ON c.caseTypeId = t.id
  LEFT JOIN
    categories ct ON c.categoryId = ct.id
  LEFT JOIN
    appointments a ON c.id = a.caseId
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

    if (firstName) {
      whereConditions.push(`CONCAT(p.firstName, ' ', p.middleName, ' ', p.lastName) LIKE '%${patientName}%'`);
    }
    if(middleName){
      whereConditions.push(`p.middle_name `)
    }
    if(lastName){

    }
    if (caseId) {
      whereConditions.push(`c.id = '${caseId}'`);
    }
    if(categoryName){
      whereConditions.push(`ct.categoryName= '${categoryName}'`)
    }
    if(purposeOfVisit){
        whereConditions.push(`c.purposeOfVisit = '${purposeOfVisit}'`)
    }
    if(caseType){
      whereConditions.push(`t.Name = '${caseType}'`)
    }
    if(dob){
      whereConditions.push(`p.date_of_birth = '${dob}'`)
    }
    if(practiceLocation){
      whereConditions.push(`l.name = '${practiceLocation}'`)
    }
    if(insuranceName){
      whereConditions.push(`i.insuranceName = '${insuranceName}'` )
    }
    if(firmName){
      whereConditions.push(`f.firmName = '${firmName}'`)
    }
    if(doa){
      whereConditions.push(`a.appointmentDate ='${doa}'`)
    }
    if(doctor){
      whereConditions.push(`d.first_name LIKE '%${doctor}%'`)
    }
    if (whereConditions.length > 0) {
      sql += ` WHERE ${whereConditions.join(' AND ')};`;
    }
    // Execute the SQL query
    const results = await sequelize.query(sql);

    if (results[0].length === 0) {
      return "No matching data found.";
    }

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
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Patient",
      timestamps: false
    }
  );
  return Patient;
};
