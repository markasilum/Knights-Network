const { PrismaClient } = require('@prisma/client');
const express = require('express');
const multer  = require('multer');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes')
const personRoutes = require('./routes/personRoutes')
const companyRoutes = require('./routes/companyRoutes')
const educationRoutes = require('./routes/educationRoutes')
const jobPostRoutes = require('./routes/jobPostRoutes')
const degreeRoutes = require('./routes/degreeRoutes')

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())  
// app.use(express.urlencoded({extended: false}))
const upload = multer();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be"
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774"

let userId = companyUserId

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003"
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe"

//user routes
app.use('/user',userRoutes)
app.use('/person',personRoutes)
app.use('/company',companyRoutes)
app.use('/education', educationRoutes)


//create education


//get degree 

//get experience
app.get('/api/getexperience', async (req, res) => {
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
//create experience
app.post('/createexperience',upload.none(), async (req, res) => {
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

//JOB POST
app.use('/jobpost', jobPostRoutes)

app.get('/api/getjobdetails', async (req, res) => {
  try {
      // Extract the query parameter 'ids' from the request
      const { id } = req.query;
      // console.log(id)
      // Query the database using Prisma to fetch job post by their IDs
      const jobDetails = await prisma.jobPost.findUnique({
          where: {
              id: id 
          },
          include:{
            company: true,
          }
      });
      // console.log(jobDetails)
      res.json(jobDetails);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getjobskillsreq', async (req, res) => {
  try {
      const { id } = req.query;
      const skills = await prisma.jobSkillsReq.findMany({
          where: {
            jobPostId: id 
          },
          select: {
            skill: {
              select: {
                skillName: true
              }
            }
          }
      });
      const jobSkillsReq = skills.map(skill => skill.skill.skillName);
      // console.log(jobSkillsReq)
      res.json(jobSkillsReq);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getjoblicensereq', async (req, res) => {
  try {
      const { id } = req.query;
      const licenses = await prisma.jobLicenseReq.findMany({
          where: {
              jobPostId: id 
          },
          select: {
            license: {
              select: {
                licenseName: true
              }
            }
          }
      });
      const jobLicenseReq = licenses.map(license => license.license.licenseName);
      // console.log(jobLicenseReq)
      res.json(jobLicenseReq);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getjobdegreereq', async (req, res) => {
  try {
      const { id } = req.query;
      const degrees = await prisma.jobDegreeReq
      .findMany({
        where: {
          jobPostId: id // Replace YOUR_JOB_POST_ID with the actual job post ID
        },
        select: {
          degree: {
            select: {
              degreeName: true
            }
          }
        }
      });

    const degreeNames = degrees.map(degree => degree.degree.degreeName);
    res.json(degreeNames);
    // console.log(degreeNames);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getalljobpost', async (req, res) => {
  try{
    const jobPosts = await prisma.jobPost.findMany({
      orderBy:[
        {
          dateUpdated: 'desc'
        },
        {
          dateCreated: 'desc'
        }
      ],
      include:{
        company: true,
        jobDegreeReq: {
          include:{
            degree: true
          }
        }

      }
    })

    // console.log(jobPosts)
    res.json(jobPosts);

  }catch(error){
    console.error('Error: ', error)
    res.status(500).json({ error: 'Internal server error' });
  }

});

//create application
app.post('/sendapplication', async (req, res) => {
  try {
    const { id } = req.body;
    // Create a new person record in the database using Prisma
    const newApplication = await prisma.application.create({ 
      data:{
        person:{
          connect:{
              id:personId,
          }
        },
        jobPost:{
          connect:{
            id: id
          }
        }
      },
      include: {
        person: true,
        jobPost: true,
      },
    });
    console.log(id)

    res.status(201).json(newApplication);
    
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // console.log(req.body)
  }
});

app.get('/api/getjobpostapplications', async (req, res) => {
  try{    
    const {id} = req.query
    const data = await prisma.application.findMany({
      where:{
        personId: personId,
      },  
      orderBy:[
        {
          dateCreated: 'desc'
        }
      ],
      include:{
        jobPost:{
          include: {
            company: true
          }
        },
      }
    });
    res.json(data);
    
  }catch(error){
    console.error('Error getting application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(req.body)

  }
})

app.get('/api/checkuserapplication', async (req, res) => {
  try{    
    const {id} = req.query
    const data = await prisma.application.findMany({
      where:{
        jobPostId: id,
      }
    });
    let exist = false;
    
    data.map((job)=>{
      if(job.jobPostId != null){
        exist = true
      }
    })
    res.json(exist);
    
  }catch(error){
    console.error('Error getting application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(req.body)

  }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

