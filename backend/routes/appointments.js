const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const appointController = require("../controllers/appointment")
const { Op } = require("sequelize");

router.get("/getType", appointController.getType)
router.get("/getId/:id", appointController.getId)
router.get("/:id", appointController.getOneAppointments)
router.get("/", appointController.getAllAppointment)

router.post("/", appointController.addAppoint);

//router.put("/:id",appointController.updateAppointment)

router.delete('/:id',appointController.deleteAppointment)

module.exports = router;
