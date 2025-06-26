const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const companyController = require("../controllers/companyController");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      const dir=`./uploads/`+file.fieldname;
      if(file.fieldname === "profPic"){
        cb(null,dir);
      }else if(file.fieldname === "secRegistration"){
        cb(null,dir);
      }else if(file.fieldname === "dtiRegistration"){
        cb(null,dir);
      }else if(file.fieldname === "businessPermit"){
        cb(null,dir);
      }
  
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({ storage: storage })


router.get("/details", companyController.getCompanyDetails);
router.get("/profile/view", companyController.viewCompanyProfile);
router.get("/contact", companyController.getContact);
router.post("/create", upload.fields([{ name: 'profPic' }, { name: 'secRegistration' }, { name: 'dtiRegistration' }, { name: 'businessPermit' }]), companyController.createCompany);
router.put("/update", upload.single('profPic'),companyController.updateCompany);
router.post("/contact/create", upload.none(),companyController.addContact);
router.put("/contact/update", upload.none(),companyController.updateContact);
router.delete("/contact/delete", companyController.deleteContact);




module.exports = router;
