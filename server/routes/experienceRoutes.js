const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer  = require('multer');
const router = express.Router();
const prisma = new PrismaClient();
const upload = multer();


let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

router.get('/person/index', async (req, res) => {
    try{    
      const data = await prisma.experience.findMany({
        where:{
          personId:'9689255f-6e15-4073-8c68-5d39ad8f9003',
        },
      });
  
      res.json(data);
      
    }catch(error){
      console.error('Error getting degree:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
  
    }
  
  })

router.post('/create',upload.none(), async (req, res) => {
    console.log(req.body)
    try {
      // Extract data from the request body
      const { jobTitle, companyName, jobDetails, startDate, endDate} = req.body;
      console.log("startDate "+startDate)
      // Create a new person record in the database using Prisma
      const newEducation = await prisma.experience.create({ 
        data:{
          jobTitle, 
          companyName, 
          jobDetails,
          startDate,
          endDate,
          person:{
            connect:{
                id:"9689255f-6e15-4073-8c68-5d39ad8f9003",
            }
          },
        },
        include: {
          person: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newEducation);
      console.log(newEducation)
    } catch (error) {
      console.error('Error creating experience:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      // console.log(req.body)
    }
  });

module.exports = router