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

router.post('/create', upload.single("appLetterFile"),applicationController.apply);
router.put('/set-status', upload.none(),applicationController.setStatus);
router.get('/person/index', applicationController.getListOfApplications)
router.get('/check', applicationController.checkIfApplied)
router.put('/archive', upload.none(),applicationController.archive);

module.exports = router