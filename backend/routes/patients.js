const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");

router.post("/add", patientController.addPatient);
router.get("/all", patientController.getAllPatients);
router.get("/update-Patient/:id", patientController.getPatient);
router.put("/update/:id",patientController.updatePatient);
router.delete("/delete/:id",patientController.deletePatient);

module.exports = router;
