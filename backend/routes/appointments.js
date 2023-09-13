const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const appointController = require("../controllers/appointment")
const { Op } = require("sequelize");

/**
 * @swagger
 * tags:
 *  name: Appointment
 *  description: API endpoint for managing apointment
 */

/**
 * @swagger
 * components:
 *     schemas:
 *        AppointmentType:
 *           type: object
 *           properties:
 *              id:
 *                type: integer
 *              appointmentType:
 *                type: string
 *        Appointment:
 *           type: object
 *           properties:
 *              id:
 *                type: integer	
 *              appointmentDate:
 *                type: integer
 *                format: date
 *              appointmentTime:
 *                type: integer	
 *              duration:
 *                type: integer
 *              appointmentTypeId:
 *                type: integer	
 *              specialtyId	:
 *                type: integer
 *              doctorId:
 *                type: integer	
 *              caseId:
 *                type: integer       
 * /appoint/type:
 *   get:
 *     summary: Get all Appointment Types
 *     tags: [Appointment]
 *     description: Retrieve all appointment types from the appointmenttype table
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Successfully retrieved
 *        content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/AppointmentType'
 *      401:
 *        description: Error getting Appointment Type Information
 *      404:
 *        description: No record in Appointment Type
 */
router.get("/type", appointController.type)

/**
 * @swagger
 * /appoint/{id}:
 *  get:
 *    summary: get one appointment
 *    tags: [Appointment]
 *    description: retrieve one appointment on the basis of appointment Id.
 *    parameters:
 *       - in: path
 *         name: id
 *         type:
 *          integer
 *         required: true
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successfully retrieved
 *        content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/AppointmentType'
 *      404:
 *        description: No Appointments found.
 *      500:
 *        description: Internal server error.
 */

router.get("/:id", appointController.getOneAppointments)

/** 
* @swagger
* /appoint/:
*   get:
*     summary: Get list of all Appointment
*     tags: [Appointment]
*     description: Retrieve all appointment from the appointment table
*     security:
*       - bearerAuth: []
*     responses:
*      200:
*        description: Successfully retrieved
*        content: 
*           application/json:
*             schema:
*               type: array
*               items: 
*                  $ref: '#/components/schemas/Appointment'
*      401:
*        description: Error getting Appointment Type Information
*      404:
*        description: No record in Appointment Type
*/
router.get("/", appointController.getAllAppointment)

/**
 * @swagger
 * /appoint/:
 *   post:
 *    summary: Add single appointment to appointment table.
 *    tags: [Appointment]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *              id:
 *                type: integer	
 *              appointmentDate:
 *                type: integer
 *                format: date
 *              appointmentTime:
 *                type: integer	
 *              duration:
 *                type: integer
 *              appointmentTypeId:
 *                type: integer	
 *              specialtyId	:
 *                type: integer
 *              doctorId:
 *                type: integer	
 *              caseId:
 *                type: integer
 *    description: Add appointmetn to the appointment table while the unique appointmentId is generated by default.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Appointment Added!
 *      500:
 *        description: Internal Server Error. 
 */

router.post("/", appointController.addAppoint);

//router.put("/:id",appointController.updateAppointment)

/**
 * @swagger
 * /appoint/{id}:
 *   delete:
 *      summary: Soft Deletes single appointment.
 *      tags: [Appointment]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          201: 
 *            description: Successfully deleted!
 *          406:
 *            description: Error in deleting the appointment
 *          500:
 *            description: Internal Server Error!
 *          
 * 
 * 
 * 
 */
router.delete('/:id',appointController.deleteAppointment)

module.exports = router;
