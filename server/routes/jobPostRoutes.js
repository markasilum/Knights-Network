const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const jobPostController = require('../controllers/jobPostController')

router.get('/index', jobPostController.jobPostIndex);
router.get("/company/index", jobPostController.companyJobPostIndex);
router.post("/create", upload.none(), jobPostController.createJobPost);
router.get('/details', jobPostController.getJobDetails);
router.post('/set-status', upload.none(),jobPostController.updateJobPostStatus);


//get job post qualifications
router.get('/requirements/skills', jobPostController.jobReqSkill);
router.get('/requirements/license', jobPostController.jobReqLicense);
router.get('/requirements/degree', jobPostController.jobReqDegree);

module.exports = router;
