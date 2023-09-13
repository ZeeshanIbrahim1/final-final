const express = require("express");
const router = express.Router();
const specialtyController = require("../controllers/specialty");

/**
 * @swagger
 * components:
 *   schemas:
 *     Specialty:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *
 * /specialty/:
 *   get:
 *     summary: Get a list of all specialties
 *     description: Retrieve a list of all specialties.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of specialties.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Specialty'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       404:
 *         description: No Specialty found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/", specialtyController.getAll);

module.exports = router;
