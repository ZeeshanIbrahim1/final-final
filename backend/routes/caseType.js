const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const caseTypeController = require("../controllers/caseType");


router.get("/", caseTypeController.getAll);

module.exports = router;