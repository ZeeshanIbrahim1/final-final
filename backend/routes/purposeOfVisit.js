const express = require("express");
const router = express.Router();
const purposeOfVisit = require("../controllers/purposeOfVisit");

/**
 * @swagger
 * /purposeOfVisit/:
 *   get:
 *     summary: Get a list of all purposes of visits
 *     description: Retrieve a list of all purposes of visits.
 *     responses:
 *       200:
 *         description: A list of purposes of visits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurposeOfVisit'
 *       404:
 *         description: No insurance found.
 */
router.get("/", purposeOfVisit.getAll);

module.exports = router;
