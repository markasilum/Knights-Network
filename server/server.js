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
  try {
    // Extract data from the request body
    const { firstName, middleName, lastName, suffix, username, password, streetAddress, cityName, zipCode, countryName, emailAddress, contactNum, biography } = req.body;
    // Construct the full street address

    const updatePerson = await prisma.person.update({
      where: {
        id: "b38c6bf3-59f0-41d3-824b-01ae40b18d67",
      },
      data: {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

