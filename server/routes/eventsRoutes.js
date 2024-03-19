const express = require("express");
const multer  = require('multer');
const router = express.Router();
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/eventPhoto');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
var upload = multer({ storage: storage })

const eventController = require('../controllers/eventsController')

router.get('/index', eventController.getEventsList)
router.post('/create',upload.single("eventPhoto"), eventController.createEvent);

module.exports = router