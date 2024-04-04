const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();

const experienceController = require('../controllers/experienceController')

router.get('/person/index', experienceController.getPersonExperience)
router.post('/create',upload.none(), experienceController.createExperience);
router.put('/update',upload.none(), experienceController.updateExperience);


module.exports = router