const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const cron = require('node-cron');

const jobPostController = require('../controllers/jobPostController')
const { autoCloseJobPost } = require('../controllers/jobPostController');

router.get('/index', jobPostController.jobPostIndex);
router.get("/company/index", jobPostController.companyJobPostIndex);
router.post("/create", upload.none(), jobPostController.createJobPost);
router.post("/index/recommendations", upload.none(), jobPostController.getJobsMany);
router.put("/update", upload.none(), jobPostController.updateJobPost);
router.get('/details', jobPostController.getJobDetails);
router.get('/applicants', jobPostController.getJobApplicants);
router.post('/set-status', upload.none(),jobPostController.updateJobPostStatus);

cron.schedule('0 0 * * *', () => {
    console.log('Running job post status update...');
    autoCloseJobPost();
});

//get job post qualifications
router.get('/requirements/skills', jobPostController.jobReqSkill);
router.get('/requirements/license', jobPostController.jobReqLicense);
router.get('/requirements/degree', jobPostController.jobReqDegree);

module.exports = router;
