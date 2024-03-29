const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();

const experienceController = require('../controllers/experienceController')

router.get('/person/index', experienceController.getPersonExperience)
router.post('/create',upload.none(), );

module.exports = router