const express = require("express");
const router = express.Router();
const degreeController = require('../controllers/degreeController')

router.get('/index', degreeController.getDegreeName);

module.exports = router