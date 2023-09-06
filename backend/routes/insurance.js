const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insurance");


router.get("/", insuranceController.getAll);

module.exports = router;
