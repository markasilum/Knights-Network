const { PrismaClient } = require('@prisma/client');
const express = require('express');
const multer  = require('multer');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors())
// app.use(express.json())  
// app.use(express.urlencoded({extended: false}))
const upload = multer();

app.get('/api/data', async (req, res) => {
    const data = await prisma.person.findUnique({
      where:{
        id: "9689255f-6e15-4073-8c68-5d39ad8f9003",
      },}
    );
    

    res.json(data);
  });

  app.get('/api/getuser', async (req, res) => {
    const data = await prisma.user.findUnique({
      where:{
        id: "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be",
      },}
    );
    

    res.json(data);
  });
//create person
app.post('/api/persons',upload.none(), async (req, res) => {
    console.log('Request Body:', req.body);
    try {
      // Extract data from the request body
      const { firstName, middleName, lastName, suffix, username, password, streetAddress, cityName, zipCode, countryName, emailAddress, contactNum, biography } = req.body;
  
      // Create a new person record in the database using Prisma
      const newPerson = await prisma.user.create({ 
        data:{
          username,
          password,
          streetAddress,
          cityName,
          zipCode,
          countryName,
          emailAddress,
          contactNum,
          biography,
          verified: false,
          person:{
            create:{
                firstName,
                middleName,
                lastName,
                suffix,
            }
          },
          role:{
            create:{
              roleName: "alumni"
            }
          }
        },
        include: {
          person: true,
          role: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newPerson);
    } catch (error) {
      console.error('Error creating person:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
    }
  });

app.put('/api/updateperson',upload.none(), async (req, res) => {
  //to do: include id in the request body
  try {
    // Extract data from the request body
    const { firstName, middleName, lastName, suffix, username, password, streetAddress, cityName, zipCode, countryName, emailAddress, contactNum, biography, personId } = req.body;
    // Construct the full street address

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
          person:{
              update:{
                where:{
                  id: personId
                },
                data:{
                  firstName,
                middleName,
                lastName,
                suffix,
                }
                
              },
            },
        },
        include: {
          person: true,
        },
    })

    // Send a response with the newly created person
    res.status(201).json(updatePerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(req.body)
  }

  
  })

//create education
app.get('/api/geteduc', async (req, res) => {
  try{    
    const data = await prisma.education.findMany({
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

//create education
app.post('/createeducation',upload.none(), async (req, res) => {
  console.log(req.body)
  try {
    // Extract data from the request body
    const { schoolName, degree, qpi, startDate, endDate, awards} = req.body;
    console.log("startDate "+startDate)
    // Create a new person record in the database using Prisma
    const newEducation = await prisma.education.create({ 
      data:{
        schoolName, 
        qpi, 
        startDate,
        endDate,
        awards,
        person:{
          connect:{
              id:"9689255f-6e15-4073-8c68-5d39ad8f9003",
          }
        },
        degree:{
          connectOrCreate:{
            where: {
              degreeName: degree
            },
            create: {
              degreeName: degree
            },
          }
        }
      },
      include: {
        person: true,
        degree: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newEducation);
    console.log(newEducation)
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // console.log(req.body)
  }
});

//get degree 
app.get('/api/getdegree', async (req, res) => {
  try {
      // Extract the query parameter 'ids' from the request
      const { ids } = req.query;

      if (!ids) {
          return res.status(400).json({ error: 'Ids parameter is required' });
      }

      // Split the 'ids' string into an array
      const degreeIds = ids.split(',');

      // Query the database using Prisma to fetch degrees by their IDs
      const degrees = await prisma.degree.findMany({
          where: {
              id: {
                  in: degreeIds // No need to parse IDs since they are strings
              }
          }
      });

      // Send the degrees as JSON response
      res.json(degrees);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
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
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // console.log(req.body)
  }
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

