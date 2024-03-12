const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();

const personController = require('../controllers/personController')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/prof_pics');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


var upload = multer({ storage: storage })

router.get("/details", personController.getPersonDetails);
router.post("/create", upload.single('profPic'), personController.createPerson);
router.put("/update", upload.single('profPic'), personController.updatePerson);

module.exports = router;
