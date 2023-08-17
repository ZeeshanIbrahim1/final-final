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
    }
  );
  return Patient;
};
