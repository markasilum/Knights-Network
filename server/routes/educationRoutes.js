const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();
const educationController = require('../controllers/educationController')


router.get('/index', educationController.getEducation)
router.post('/create',upload.none(), educationController.createEducation);
router.put('/update',upload.none(), educationController.updateEducation);
router.delete('/delete', educationController.deleteEducation);


module.exports = router