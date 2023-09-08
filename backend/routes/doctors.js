const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctors");

/**
 * @swagger
 * /doctors/all:
 *   get:
 *     summary: Get a list of all doctors
 *     description: Retrieve a list of all doctors.
 *     responses:
 *       200:
 *         description: A list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: No doctors found.
 */

router.get("/all", doctorsController.getAll);

module.exports = router;
