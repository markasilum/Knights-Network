const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();

const recommendController = require('../controllers/recommendController')

router.get('/get',recommendController.getRecommendation)

module.exports = router