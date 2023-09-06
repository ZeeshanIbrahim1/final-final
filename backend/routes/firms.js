const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firms");


router.get("/", firmController.getAll);

module.exports = router;
