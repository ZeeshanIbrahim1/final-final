const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insurance");

/**
 * @swagger
 * /insurance/:
 *   get:
 *     summary: Get a list of all insurance
 *     description: Retrieve a list of all insurance.
 *     responses:
 *       200:
 *         description: A list of insurance.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: No insurance found.
 */
router.get("/", insuranceController.getAll);

module.exports = router;
