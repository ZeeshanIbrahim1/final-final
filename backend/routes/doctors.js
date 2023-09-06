const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctors");


router.get("/all", doctorsController.getAll);

module.exports = router;
