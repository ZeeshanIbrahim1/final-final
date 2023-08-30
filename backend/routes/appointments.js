const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const appointController = require("../controllers/appointment")
const { Op } = require("sequelize");

router.post("/addAppointment", appointController.addAppoint);
router.get("/getId/:id", appointController.getId)
router.get("/getType", appointController.getType)
router.get("/getAppoints/:id", appointController.getAppointments)
router.put("/updateAppoint/:id",appointController.updateAppointment)
router.get("/getAllAppointments", appointController.getAllAppointment)
router.delete('/deleteAppoint/:id',appointController.deleteAppointment)

module.exports = router;
