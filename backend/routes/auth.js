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
 *       401:
 *         description: Validation error. Invalid input data.
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
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the user.
 *                 userId:
 *                   type: integer
 *                   description: The user's unique identifier.
 *       401:
 *         description: Authentication failed. Invalid email or password.
 *       500:
 *         description: Internal server error.
 *     security: []
 */
router.post("/login", authController.login);
module.exports = router;