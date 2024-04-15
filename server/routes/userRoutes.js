const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/role", userController.role);
router.get("/details",userController.userDetails);
router.get("/index/alumni", userController.userIndexAlumni)
router.get("/index/students", userController.userIndexStudents)
router.get("/index/companies", userController.userIndexCompany)
router.get("/verify", userController.verifyUser)
module.exports = router;
