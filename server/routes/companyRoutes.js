const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const companyController = require("../controllers/companyController");



router.get("/details", companyController.getCompanyDetails);
router.post("/create", upload.none(), companyController.createCompany);
router.put("/update", upload.none(),companyController.updateCompany);

module.exports = router;
