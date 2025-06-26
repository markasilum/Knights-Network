const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const {requireAuth} = require('../middleware/authMiddleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/applicationLetters');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
var upload = multer({ storage: storage })

const applicationController = require('../controllers/applicationsController')

/**
 * @openapi
 * /application/create:
 *   post:
 *     tags:
 *       - application
 *     summary: Submit a new application
 *     description: Allows a user to apply for a job by uploading an application letter.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - appLetterFile
 *             properties:
 *               appLetterFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Missing or invalid file
 */
router.post('/create', upload.single("appLetterFile"), applicationController.apply);

/**
 * @openapi
 * /application/set-status:
 *   put:
 *     tags:
 *       - application
 *     summary: Update application status
 *     description: Sets or updates the status of a specific application (e.g. pending, accepted, rejected).
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - applicationId
 *               - status
 *             properties:
 *               applicationId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid input data
 */
router.put('/set-status', upload.none(), applicationController.setStatus);

/**
 * @openapi
 * /application/person/index:
 *   get:
 *     tags:
 *       - application
 *     summary: Get list of applications for a person
 *     description: Retrieves all applications submitted by the authenticated user.
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/person/index', applicationController.getListOfApplications);

/**
 * @openapi
 * /application/check:
 *   get:
 *     tags:
 *       - application
 *     summary: Check if user has already applied
 *     description: Checks whether the authenticated user has already applied for a specific job post.
 *     responses:
 *       200:
 *         description: Application check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasApplied:
 *                   type: boolean
 */
router.get('/check', applicationController.checkIfApplied);

/**
 * @openapi
 * /application/archive:
 *   put:
 *     tags:
 *       - application
 *     summary: Archive an application
 *     description: Archives an existing application, marking it as inactive or withdrawn.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - applicationId
 *             properties:
 *               applicationId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application archived successfully
 *       400:
 *         description: Invalid application ID
 */
router.put('/archive', upload.none(), applicationController.archive);


module.exports = router