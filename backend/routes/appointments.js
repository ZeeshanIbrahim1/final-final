const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const appointController = require("../controllers/appointment")
const { Op } = require("sequelize");

router.post("/addAppointment", appointController.addAppoint);

module.exports = router;
