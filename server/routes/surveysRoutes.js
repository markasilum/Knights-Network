const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();
const surveyController = require('../controllers/surveysController')

router.post("/create", upload.none(),surveyController.createSurvey)
router.post("/submit/answer", upload.none(),surveyController.answerSurvey)
router.get("/index",surveyController.getSurveyIndex)
router.get("/answers",surveyController.getSurveyAnswers)
router.get("/details",surveyController.getSurveyDetails)



module.exports = router;
