const express = require("express");
const multer  = require('multer');
const router = express.Router();
const path = require('path');
const {requireAuth} = require('../middleware/authMiddleware')

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

router.get('/index',eventController.getEventsList)
router.post('/create',upload.single("eventPhoto"), eventController.createEvent);
router.post('/join', eventController.joinEvent);
router.put('/update',upload.single("eventPhoto"), eventController.updateEvent);
router.get('/details', eventController.getEventDetails)
router.get('/check', eventController.checkIfJoined)
router.get('/partners', eventController.getPartners)
router.put('/set-status', upload.none(), eventController.setStatus)



module.exports = router