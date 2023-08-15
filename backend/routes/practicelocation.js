const express = require("express");
const router = express.Router();
const practiceController = require("../controllers/practicelocation");


router.get("/all", practiceController.getAll);
router.get("/id", practiceController.getById);

module.exports = router;
