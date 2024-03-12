const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/role", userController.role);
router.get("/details",userController.userDetails);

module.exports = router;
