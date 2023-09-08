const express = require("express");
const router = express.Router();
const practiceController = require("../controllers/practicelocation");

/**
 * @swagger
 * /practicelocation/:
 *   get:
 *     summary: Get a list of all practice location
 *     description: Retrieve a list of all practice location.
 *     responses:
 *       200:
 *         description: A list of practice location.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PracticeLocations'
 *       404:
 *         description: No practice location found.
 */
router.get("/", practiceController.getAll);

module.exports = router;
