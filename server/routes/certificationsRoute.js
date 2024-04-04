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

router.get('/person/index',certificationsController.getPersonCerts)
router.post('/create',upload.single('certPhoto'), certificationsController.createCert)
router.put('/update',upload.single('certPhoto'), certificationsController.updateCert)

module.exports = router