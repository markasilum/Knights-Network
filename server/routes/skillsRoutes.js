const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();

const skillsController = require('../controllers/skillsController')

router.get('/person/index',skillsController.getPersonSkills)
router.post('/create',upload.none(), skillsController.createPersonSkill)


module.exports = router