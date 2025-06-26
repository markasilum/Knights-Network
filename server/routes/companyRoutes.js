const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const companyController = require("../controllers/companyController");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      const dir=`./uploads/`+file.fieldname;
      if(file.fieldname === "profPic"){
        cb(null,dir);
      }else if(file.fieldname === "secRegistration"){
        cb(null,dir);
      }else if(file.fieldname === "dtiRegistration"){
        cb(null,dir);
      }else if(file.fieldname === "businessPermit"){
        cb(null,dir);
      }
  
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({ storage: storage })


/**
 * @openapi
 * /company/details:
 *   get:
 *     tags:
 *       - company
 *     summary: Get company details
 *     description: Retrieves the full details of the company associated with the current user.
 *     responses:
 *       200:
 *         description: Company details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Company not found
 */
router.get("/details", companyController.getCompanyDetails);

/**
 * @openapi
 * /company/profile/view:
 *   get:
 *     tags:
 *       - company
 *     summary: View public company profile
 *     description: Retrieves a public-facing version of the company's profile.
 *     responses:
 *       200:
 *         description: Company profile retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/profile/view", companyController.viewCompanyProfile);

/**
 * @openapi
 * /company/contact:
 *   get:
 *     tags:
 *       - company
 *     summary: Get company contact information
 *     description: Retrieves the company's registered contact information.
 *     responses:
 *       200:
 *         description: Contact information retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/contact", companyController.getContact);

/**
 * @openapi
 * /company/create:
 *   post:
 *     tags:
 *       - company
 *     summary: Create a new company
 *     description: Creates a new company record with uploaded documents and profile picture.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profPic:
 *                 type: string
 *                 format: binary
 *               secRegistration:
 *                 type: string
 *                 format: binary
 *               dtiRegistration:
 *                 type: string
 *                 format: binary
 *               businessPermit:
 *                 type: string
 *                 format: binary
 *               companyName:
 *                 type: string
 *               industry:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid or missing fields
 */
router.post("/create", upload.fields([
  { name: 'profPic' },
  { name: 'secRegistration' },
  { name: 'dtiRegistration' },
  { name: 'businessPermit' }
]), companyController.createCompany);

/**
 * @openapi
 * /company/update:
 *   put:
 *     tags:
 *       - company
 *     summary: Update company profile
 *     description: Updates company information and optionally the profile picture.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profPic:
 *                 type: string
 *                 format: binary
 *               companyName:
 *                 type: string
 *               industry:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 */
router.put("/update", upload.single('profPic'), companyController.updateCompany);

/**
 * @openapi
 * /company/contact/create:
 *   post:
 *     tags:
 *       - company
 *     summary: Add company contact
 *     description: Adds a new contact method to the company’s profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - value
 *             properties:
 *               type:
 *                 type: string
 *                 description: e.g., "email", "phone"
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact added
 *       400:
 *         description: Missing or invalid contact info
 */
router.post("/contact/create", upload.none(), companyController.addContact);

/**
 * @openapi
 * /company/contact/update:
 *   put:
 *     tags:
 *       - company
 *     summary: Update company contact
 *     description: Updates an existing contact method of the company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - contactId
 *               - type
 *               - value
 *             properties:
 *               contactId:
 *                 type: string
 *               type:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */
router.put("/contact/update", upload.none(), companyController.updateContact);

/**
 * @openapi
 * /company/contact/delete:
 *   delete:
 *     tags:
 *       - company
 *     summary: Delete company contact
 *     description: Removes a specific contact method from the company profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contactId
 *             properties:
 *               contactId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete("/contact/delete", companyController.deleteContact);





module.exports = router;
