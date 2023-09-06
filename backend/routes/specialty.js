const express = require("express");
const router = express.Router();
const specialtyController = require("../controllers/specialty");

router.get("/all", specialtyController.getAll);

module.exports = router;
