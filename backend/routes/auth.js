const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const authController = require("../controllers/auth");
const { Op } = require("sequelize");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User registration data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password min length must be 7 characters.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Registration success message.
 *       401:
 *         description: Validation error. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                         description: The parameter that caused the error.
 *                       msg:
 *                         type: string
 *                         description: A message describing the error.
 *     security: []
*/
router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please Enter a Valid Email.")
      .normalizeEmail()
      .custom(async (email) => {
        const existingUser = await models.User.findOne({
          where: {
            email: {
              [Op.eq]: email, // Use [Op.eq] for exact match
            },
          },
        });
        if (existingUser) {
          return Promise.reject("Email address already exists!");
        }
      }),
    body("password").trim().isLength({ min: 7 }),
  ],
  authController.signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the user.
 *                 userId:
 *                   type: string
 *                   description: The user's unique identifier.
 *       401:
 *         description: Authentication failed. Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the reason for authentication failure.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the internal server error.
 *     security: [] 
 */
router.post("/login", authController.login);
module.exports = router;
