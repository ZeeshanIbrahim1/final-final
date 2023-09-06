const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");

router.get('/filter',patientController.filterData)
router.get("/:id", patientController.getPatient);
router.get('/', patientController.getPatientAll)
router.post("/", patientController.addPatient);
router.put("/:id",patientController.updatePatient);
router.put("/",patientController.updateAll)
router.delete("/:id1/:id2/:id3",patientController.deletePatient);
router.delete('/:id',patientController.deleteOne)

module.exports = router;
