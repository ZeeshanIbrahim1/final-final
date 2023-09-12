const express = require("express");
const router = express.Router();
const purposeOfVisit = require("../controllers/purposeOfVisit");

/**
 * @swagger
 * components:
 *   schemas:
 *     PurposeOfVisit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         PurposeOfVisit:
 *           type: string
 * 
 * /purposeOfVisit/:
 *   get:
 *     summary: Get a list of all purposes of visits
 *     description: Retrieve a list of all purposes of visits.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of purposes of visits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurposeOfVisit'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       404:
 *         description: No record in Purpose of visit.
 *       500:
 *         description: Internal server error.
 */
router.get("/", purposeOfVisit.getAll);

module.exports = router;
