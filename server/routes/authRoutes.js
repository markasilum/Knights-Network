const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController')


/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Log in a user
 *     description: Accepts user credentials and initiates a session. Returns user data and sets cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authController.loginReceive);

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     tags:
 *       - auth
 *     summary: Log out the current user
 *     description: Destroys the current session and removes cookies.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: No user is logged in
 */
router.get("/logout", authController.logoutUser);

/**
 * @openapi
 * /auth/email:
 *   get:
 *     tags:
 *       - auth
 *     summary: Get email from cookie
 *     description: Returns the email stored in cookies (if present).
 *     responses:
 *       200:
 *         description: Email retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *       404:
 *         description: No email cookie found
 */
router.get("/email", authController.getEmailCookie);

/**
 * @openapi
 * /auth/user:
 *   get:
 *     tags:
 *       - auth
 *     summary: Get current logged-in user
 *     description: Returns the authenticated user's information based on the session or token.
 *     responses:
 *       200:
 *         description: User information retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: User not authenticated
 */
router.get("/user", authController.getCurrentUser);




module.exports = router