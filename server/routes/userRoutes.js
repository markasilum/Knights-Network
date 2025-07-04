const express = require("express");
const multer  = require('multer');
const router = express.Router();
const userController = require('../controllers/userController')
const upload = multer();

router.get("/role", userController.role);
router.get("/details",userController.userDetails);
router.get("/index/alumni", userController.userIndexAlumni)
router.get("/index/students", userController.userIndexStudents)
router.get("/index/companies", userController.userIndexCompany)
router.get("/verify", userController.verifyUser)
router.get("/setting", userController.userSetting)
router.get("/archive", userController.deactivateAccount)
router.post("/reactivate", userController.reactivateAccount)
router.post("/resume/log", userController.resumeLog)
router.get("/resume/log/view", userController.getResumeLog);
router.get("/admin/archive", userController.archiveUser);
router.get("/admin/unarchive", userController.unArchiveUser);
router.post("/admin/send", upload.none(), userController.sendEmail);




router.put("/setting/update", userController.userSettingUpdate)
module.exports = router;
