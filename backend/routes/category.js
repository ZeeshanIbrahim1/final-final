const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const categoryController = require("../controllers/category");

/**
 * @swagger
 * /category/:
 *   get:
 *     summary: Get a list of all caregories
 *     description: Retrieve a list of all existing caregories.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       404:
 *         description: No Case Types found.
 */

router.get("/", categoryController.getAll);

module.exports = router;