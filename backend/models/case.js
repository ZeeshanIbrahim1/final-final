"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
    }
    static addCase(
      caseId,
      purposeOfVisit,
      doa,
      firmId,
      insuranceId,
      patientId,
      practiceLocationId,
      caseTypeId,
      categoryId,
    ) {
      return Case.create({
        caseId,
        purposeOfVisit,
        doa,
        firmId,
        insuranceId,
        patientId,
        practiceLocationId,
        caseTypeId,
        categoryId,
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
    static async updateCase(
      caseId,
      purposeOfVisit,
      doa,
      // firmId,
      insuranceId,
      practiceLocationId,
      caseTypeId,
      categoryId,
      ){
        return Case.update({
          purposeOfVisit,
          doa,
          // firmId,
          insuranceId,
          practiceLocationId,
          caseTypeId,
          categoryId,
        },{
          where:{id: caseId}
        })
    }

  }
  Case.init(
    {
      purposeOfVisit: DataTypes.STRING,
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
