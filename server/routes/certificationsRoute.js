const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();

const certificationsController = require('../controllers/certificationsController')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads/certPhoto');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage })

/**
 * @openapi
 * /certification/person/index:
 *   get:
 *     tags:
 *       - certification
 *     summary: Get certifications of the current user
 *     description: Retrieves all certifications associated with the currently authenticated user.
 *     responses:
 *       200:
 *         description: List of certifications retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/person/index', certificationsController.getPersonCerts);

/**
 * @openapi
 * /certification/delete:
 *   delete:
 *     tags:
 *       - certification
 *     summary: Delete a certification
 *     description: Deletes a specific certification belonging to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - certId
 *             properties:
 *               certId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Certification deleted successfully
 *       404:
 *         description: Certification not found
 */
router.delete('/delete', certificationsController.deleteCert);

/**
 * @openapi
 * /certification/create:
 *   post:
 *     tags:
 *       - certification
 *     summary: Upload a new certification
 *     description: Allows a user to upload a new certification with an image and metadata.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - certPhoto
 *             properties:
 *               certPhoto:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               issuer:
 *                 type: string
 *               dateIssued:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Certification created successfully
 *       400:
 *         description: Missing or invalid input
 */
router.post('/create', upload.single('certPhoto'), certificationsController.createCert);

/**
 * @openapi
 * /certification/update:
 *   put:
 *     tags:
 *       - certification
 *     summary: Update an existing certification
 *     description: Updates certification details and optionally replaces the photo.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - certId
 *             properties:
 *               certId:
 *                 type: string
 *               certPhoto:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               issuer:
 *                 type: string
 *               dateIssued:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Certification updated successfully
 *       404:
 *         description: Certification not found
 */
router.put('/update', upload.single('certPhoto'), certificationsController.updateCert);

module.exports = router