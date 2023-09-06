const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const casesController = require("../controllers/cases");


router.get("/getCase/:id", casesController.getCase)
router.get("/getId/:id",casesController.getId)
router.get("/", casesController.getAll)

router.post("/", casesController.addCase);

router.put("/:id",casesController.updateCase);

router.delete("/:id",casesController.deleteCase)

module.exports = router;
