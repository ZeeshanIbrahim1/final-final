"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
    }
    static addCase(
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
      firmZip
    ) {
      return Case.create({
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
        firmZip,
      });
    }
    static async getOneCase(id){
      console.log("IN getOneCase")
      try{
        const cases = await Case.findOne({ where: { id } });
        return cases; 
      }
      catch(error){
        console.log("Error in getOneCase",error);
        throw error;
      }
    }
    static async updatePatient(
      caseId,
      firmId,
      patientId,
      insuranceId,
      practiceLocationId,
      category,
      purposeOfVisit,
      caseType,
      doa){
        return Case.update({
      firmId,
      patientId,
      insuranceId,
      practiceLocationId,
      category,
      purposeOfVisit,
      caseType,
      doa,
        },{
          where:{id: caseId}
        })
      }

  }
  Case.init(
    {
      category: DataTypes.STRING,
      purposeOfVisit: DataTypes.STRING,
      caseType: DataTypes.STRING,
      doa: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Case",
    }
  );
  return Case;
};
