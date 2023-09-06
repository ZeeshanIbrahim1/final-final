const express = require("express");
const router = express.Router();
const purposeOfVisit = require("../controllers/purposeOfVisit");


router.get("/", purposeOfVisit.getAll);

module.exports = router;
