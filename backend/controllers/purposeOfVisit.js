const models = require("../models");
const getAll = async (req,res,next)=>{
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


module.exports = {
  getAll
};