const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();

const licenseController = require('../controllers/licenseController')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads/licensePic');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage })

router.get('/person/index',licenseController.getPersonLicenses)
router.post('/create',upload.single('licensePic'), licenseController.createPersonLicense)
router.put('/update',upload.single('licensePic'), licenseController.updatePersonLicense)


module.exports = router