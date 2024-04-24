const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController')


router.post("/login",authController.loginReceive);
router.get("/logout",authController.logoutUser);
router.get("/email",authController.getEmailCookie);
router.get("/user",authController.getCurrentUser);



module.exports = router