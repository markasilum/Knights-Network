const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const applicationController = require('../controllers/applicationsController')

router.post('/create', applicationController.apply);
router.put('/set-status', upload.none(),applicationController.setStatus);
router.get('/person/index', applicationController.getListOfApplications)
router.get('/check', applicationController.checkIfApplied)
router.put('/archive', upload.none(),applicationController.archive);

module.exports = router