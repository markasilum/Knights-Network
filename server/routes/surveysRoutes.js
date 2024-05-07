const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();
const surveyController = require('../controllers/surveysController')

router.post("/create", upload.none(),surveyController.createSurvey)
router.get("/index",surveyController.getSurveyIndex)
router.get("/details",surveyController.getSurveyDetails)



module.exports = router;
