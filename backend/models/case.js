"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {}
    static addCase(
      doa,
      firmId,
      insuranceId,
      patientId,
      practiceLocationId,
      caseTypeId,
      categoryId,
      purposeOfVisitId,
      ) {
    try{
      return Case.create({
        doa,
        firmId,
        insuranceId,
        patientId,
        practiceLocationId,
        caseTypeId,
        categoryId,
        purposeOfVisitId,
      });
    }catch(err){

    }
    
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
      firmId,
      insuranceId,
      practiceLocationId,
      caseTypeId,
      categoryId,
      ){
        return Case.update({
          purposeOfVisit,
          doa,
          firmId,
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
      doa: DataTypes.STRING,
      deleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Case",
      timestamps: false 
    }
  );
  return Case;
};
