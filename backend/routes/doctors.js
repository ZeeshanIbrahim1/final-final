const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctors");

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         first_name:
 *           type: string
 *         middle_name:
 *           type: string
 *         last_name:
 *           type: string
 *
 * /doctor/all:
 *   get:
 *     summary: Get a list of all doctors
 *     description: Retrieve a list of all doctors.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       404:
 *         description: No doctors found.
 */




router.get("/all", doctorsController.getAll);

module.exports = router;
