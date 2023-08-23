const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const casesController = require("../controllers/cases");


router.post("/add", casesController.addCase);
router.get("/getCase/:id", casesController.getCase)
router.put("/update/:id",casesController.updateCase);
router.get("/getId/:id",casesController.getId)
router.get("/visit", casesController.getVisit)
router.get("/allCases", casesController.getAll)

module.exports = router;
