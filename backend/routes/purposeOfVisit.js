const express = require("express");
const router = express.Router();
const purposeOfVisit = require("../controllers/purposeOfVisit");

/**
 * @swagger
 * /purposeOfVisit/:
 *   get:
 *     summary: Get a list of all purposes of visits
 *     description: Retrieve a list of all purposes of visits.
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
router.get("/", purposeOfVisit.getAll);

module.exports = router;
