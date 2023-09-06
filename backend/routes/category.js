const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const categoryController = require("../controllers/category");


router.get("/", categoryController.getAll);

module.exports = router;