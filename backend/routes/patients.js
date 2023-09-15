const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");

/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: API endpoints for managing patients
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       Patient:
 *         type: object
 *         properties:
 *            id:
 *              type: integer	
 *            first_name:
 *              type: string
 *            middle_name:
 *              type: string
 *            last_name:
 *              type: string
 *            email:
 *              type: string	
 *            gender:
 *              type: string	
 *            date_of_birth:
 *              type: string
 *              format: date	
 *            ssn:
 *              type: string	
 *            address:
 *              type: string	
 *            city:
 *              type: string	
 *            state:
 *              type: string	
 *            zip:
 *              type: string
 */

/**
 * @swagger
 * /patient/patients:
 *   post:
 *    summary: Get a list of patients based on filters.
 *    tags: [Patient]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Retrieve a list of patients with this first name.
 *              middle_name:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Retrieve a list of patients with this middle name.
 *              last_name:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Retrieve a list of patients with this last name.
 *              caseId:
 *                type: string
 *                description: The ID of a specific case.
 *              categoryName:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by category name.
 *              purposeOfVisit:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by purpose of visit.
 *              caseType:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by case type.
 *              practiceLocation:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by practice location.
 *              insuranceName:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by insurance name.
 *              firmName:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by firm name.
 *              doctor:
 *                type: array  # Updated to array
 *                items:
 *                  type: string
 *                description: Filter by doctor's name.
 *              page:
 *                type: integer
 *                required: true
 *                description: The page number for pagination.
 *              pageSize:
 *                type: integer
 *                required: true
 *                description: The number of items per page.
 *    responses:
 *     200:
 *      description: A list of Patients.
 *      content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: 
 *               patientName:
 *                 type: string
 *                 description: 
 *               caseId:
 *                 type: integer
 *                 description: The ID of the case. 
 *               appointmentId:
 *                 type: integer
 *                 description: The ID of the appointment. 
 *               categoryName:
 *                 type: string
 *                 description: Category name. 
 *               purposeOfVisit:
 *                 type: string
 *                 description:  Purpose of visit. 
 *               caseType:
 *                 type: string
 *                 description:  Case type. 
 *               patientDoB:
 *                 type: string
 *                 format: date
 *                 description:  Date of Birth of the patient. 
 *               practiceLocation:
 *                 type: string
 *                 description: Practice location. 
 *               insuranceName:
 *                 type: string
 *                 description: Insurance name. 
 *               firmName:
 *                 type: string
 *                 description: Firm name. 
 *               dateOfAccident:
 *                 type: string
 *                 format: date
 *                 description: Date of accident. 
 *               doctorName:
 *                 type: string
 *                 description: Name of the doctor. 
 *    security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /patient/{id}:
 *   get:
 *     summary: get one patient.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Patient Id
 *     description: get one specific patient in the basis of passed Patient Id.     
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                 schema:
 *                    type: array
 *                    items:
 *                      $ref: '#components/schemas/Patient'
 *          404:
 *            description: No patients found.
 *          500:
 *            description: Internal Server Error.
*/

/**
 * @swagger
 * /patient/:
 *   get:
 *     summary: get list of all patients.
 *     tags: [Patient]
 *     description: Retrieve list of all patients.     
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                 schema:
 *                    type: array
 *                    items:
 *                      $ref: '#components/schemas/Patient'
 *          404:
 *            description: No patients found.
 *          500:
 *            description: Internal Server Error.
*/
/**
 * @swagger
 *  /patient/:
 *   post:
 *      summary: Add single patient to table.
 *      tags: [Patient]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               middle_name:
 *                 type: string
 *                 required: false
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               ssn:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               gender:
 *                 type: string
 *               zip:
 *                 type: string 
 *               date_of_birth:
 *                 format: date
 *                 type: string
 *      description: Add case to the case table while the unique caseId is generated by default.
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: New Patient created.
 *        201:
 *          description: Patient Id created
 *          content:
 *             items:
 *              properties:
 *                 name: id
 *                 type: integer
 *        401:
 *          description: Patient with same Date of Birth already exists!
 *        500:
 *          description: Internal Server Error. 
*/


/**
 * @swagger
 * /patient/:
 *   put:
 *     summary: Update a new patient record
 *     tags: [Patient]
 *     description: Create a new patient record along with case and appointment data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientData:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   middle_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   gender:
 *                     type: string
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                   ssn:
 *                     type: string
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zip:
 *                     type: string
 *               caseData:
 *                 type: object
 *                 required: true
 *                 properties:
 *                   id:
 *                     type: string
 *                   doa:
 *                     type: string
 *                     format: date
 *                   firmId:
 *                     type: integer
 *                   insuranceId:
 *                     type: integer
 *                   practiceLocationId:
 *                     type: integer
 *                   caseTypeId:
 *                     type: integer
 *                   categoryId:
 *                     type: integer
 *                   purposeOfVisitId:
 *                     type: integer
 *               appointmentData:
 *                 type: object
 *                 required: true
 *                 properties:
 *                   id:
 *                     type: integer
 *                   appointmentDate:
 *                     type: string
 *                     format: date
 *                   appointmentTime:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                   appointmentTypeId:
 *                     type: integer
 *                   specialtyId:
 *                     type: integer
 *                   doctorId:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Update successful
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: An error occurred while updating data
*/


/**
 * @swagger
 * /patient/{id1}/{id2}/{id3}:
 *   delete:
 *     summary: Soft Delete a Case (if no appointments exist).
 *     tags: [Patient]
 *     description: Soft Delete a case if no appointments exist for the case by adding current time stamp to the deleted attribute.
 *     parameters:
 *       - in: path
 *         name: id1
 *         schema:
 *           type: integer
 *         description: The ID of the case to be deleted.
 *         required: true
 *       - in: path
 *         name: id2
 *         schema:
 *           type: integer
 *         description: The ID of the appointment to be deleted.
 *         required: true
 *       - in: path
 *         name: id3
 *         schema:
 *           type: integer
 *         description: The ID of the patient to be deleted.
 *         required: true
 *     responses:
 *       201:
 *         description: Case successfully deleted.
 *       400:
 *         description: Bad request. Appointments exist for the case, so it cannot be deleted.
 *       500:
 *         description: Internal server error. An error occurred during the deletion process.
*/

/**
 * @swagger
 * /patient/{id}:
 *   delete:
 *     summary: Soft Delete a patient.
 *     description: Soft deletes a patient if no cases exist for the patient.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the patient to be deleted.
 *         required: true
 *     responses:
 *       200:
 *         description: Patient successfully soft deleted.
 *       401:
 *         description: Unauthorized. Cases exist for the patient, so the patient cannot be deleted.
 *       500:
 *         description: Internal server error. An error occurred during the deletion process.
*/
router.get('/', patientController.getPatientAll);
router.get('/:id', patientController.getPatient);
router.post('/patients',patientController.filterData)
router.post("/", patientController.addPatient);
router.put("/",patientController.updateAll)
router.delete("/:id1/:id2/:id3",patientController.deletePatient);
router.delete('/:id',patientController.deleteOne)

module.exports = router;
