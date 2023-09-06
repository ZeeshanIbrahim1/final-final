const express = require("express");
const router = express.Router();
const practiceController = require("../controllers/practicelocation");


router.get("/", practiceController.getAll);

module.exports = router;
