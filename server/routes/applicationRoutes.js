const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const applicationController = require('../controllers/applicationsController')

router.post('/create', applicationController.apply);
router.get('/person/index', applicationController.getListOfApplications)
router.get('/check', applicationController.checkIfApplied)

module.exports = router