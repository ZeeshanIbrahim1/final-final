const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firms");

/**
 * @swagger
 * components:
 *   schemas:
 *      Firm:
 *        type: object
 *        properties:
 *          id:
 *            type: integer	
 *          firmName:	
 *            type: string 
 *          firmCity:
 *            type: string	
 *          firmState:
 *            type: string	
 *          firmZip:
 *            type: string
 *  
 * /firm/:
 *   get:
 *     summary: Get a list of all firms
 *     description: Retrieve a list of all doctor firms.
 *     responses:
 *       200:
 *         description: A list of Firms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Firm'
 *       404:
 *         description: No doctors found.
 */
router.get("/", firmController.getAll);

module.exports = router;
