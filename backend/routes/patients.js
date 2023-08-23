const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");

router.post("/add", patientController.addPatient);
router.get("/update-Patient/:id", patientController.getPatient);
router.put("/update/:id",patientController.updatePatient);
router.delete("/delete/:id1/:id2/:id3",patientController.deletePatient);
router.get('/filter',patientController.filterData)
router.get('/getAllP', patientController.getPatientAll)
router.delete('/deleteOne/:id',patientController.deleteOne)

module.exports = router;
