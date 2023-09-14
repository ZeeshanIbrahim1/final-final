const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insurance");

/**
 * @swagger
 * /insurance/:
 * components:
 *   schemas:
 *      Insurance:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *            insuranceName:
 *              type: string
 *            insuranceCity:
 *              type: string
 *            insuranceState:
 *              type: string
 *            insuranceZip:
 *              type: string
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
 *                 $ref: '#/components/schemas/Insurance'
 *       404:
 *         description: No insurance found.
 */
router.get("/", insuranceController.getAll);

module.exports = router;
