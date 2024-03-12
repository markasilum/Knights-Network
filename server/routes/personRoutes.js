const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();
const prisma = new PrismaClient();


let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";
let personUserId2 = "bdb007b8-917f-4c93-ac85-2186970525d7"


let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";
let personId2 = "cd8dbd9b-6ac3-4bbf-8d55-c4ceb339dac8";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/prof_pics');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


var upload = multer({ storage: storage })

router.get("/details", async (req, res) => {
  const data = await prisma.person.findUnique({
    where: {
      id: personId,
    },
  });
  res.json(data);
});

router.post("/create", upload.single('profPic'), async (req, res) => {
  
  try {
    // Extract data from the request body
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      username,
      password,
      streetAddress,
      cityName,
      zipCode,
      countryName,
      emailAddress,
      contactNum,
      biography,
      role
    } = req.body;

    const profPic = req.file.filename;
   
    console.log(profPic);
    // Create a new person record in the database using Prisma
    const newPerson = await prisma.user.create({
      data: {
        username,
        password,
        streetAddress,
        cityName,
        zipCode,
        countryName,
        emailAddress,
        contactNum,
        biography,
        profPic,
        verified: false,
        person: {
          create: {
            firstName,
            middleName,
            lastName,
            suffix,
          },
        },
        role: {
          create: {
            roleName: role,
          },
        },
      },
      include: {
        person: true,
        role: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newPerson);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal Server Error" });
    
  }
});

router.put("/update", upload.single('profPic'), async (req, res) => {
  //to do: include id in the request body
  try {
    // Extract data from the request body
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      username,
      password,
      streetAddress,
      cityName,
      zipCode,
      countryName,
      emailAddress,
      contactNum,
      biography,
      personId,
     
    } = req.body;

    const profPic = req.file.filename;

    const updatePerson = await prisma.user.update({
      where: {
        id: "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be",
      },
      data: {
        username,
        password,
        streetAddress,
        cityName,
        zipCode,
        countryName,
        emailAddress,
        contactNum,
        biography,
        profPic,
        person: {
          update: {
            where: {
              id: personId,
            },
            data: {
              firstName,
              middleName,
              lastName,
              suffix,
            },
          },
        },
      },
      include: {
        person: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(updatePerson);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal Server Error" });
    console.log(req.body);
  }
});
module.exports = router;
