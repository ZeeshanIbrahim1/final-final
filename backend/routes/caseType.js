const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const caseTypeController = require("../controllers/caseType");

/**
 * @swagger
 * components:
 *   schemas:
 *      CaseType:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *            name:
 *              type: string
 * /caseType/:
 *   get:
 *     summary: Get a list of all case Types
 *     description: Retrieve a list of all case types.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of case types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CaseType'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       404:
 *         description: No Case Types found.
 */

router.get("/", caseTypeController.getAll);

module.exports = router;