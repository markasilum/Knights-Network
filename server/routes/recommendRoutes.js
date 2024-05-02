const express = require("express");
const multer  = require('multer');
const router = express.Router();
const upload = multer();

const recommendController = require('../controllers/recommendController')

router.get('/get',recommendController.getRecommendation)
router.post('/notify',recommendController.storeRecommendation)


module.exports = router