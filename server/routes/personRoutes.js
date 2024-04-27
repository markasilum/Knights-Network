const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();

const personController = require('../controllers/personController')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    const dir=`./uploads/`+file.fieldname;
    if(file.fieldname === "profPic"){
      cb(null,dir);
    }else if(file.fieldname === "idPhoto"){
      cb(null,dir);
    }

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


var upload = multer({ storage: storage })

router.get("/details", personController.getPersonDetails);
router.post("/create", upload.fields([{ name: 'profPic' }, { name: 'idPhoto' }]), personController.createPerson);
router.put("/update", upload.single('profPic'), personController.updatePerson);
router.get("/credentials", personController.getPersonCredentials);
router.get("/resume/download", personController.resumePDF);

module.exports = router;
