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
    const data = await prisma.person.findFirst();
    res.json(data);
  });
  app.post('/api/persons',upload.none(), async (req, res) => {
    console.log('Request Body:', req.body);
    try {
      // Extract data from the request body
      const { firstName, middleName, lastName, suffix, username, password, street, houseNumber, cityName, zipCode, countryName, emailAddress, contactNum, biography } = req.body;
  
      // Construct the full street address
      const streetAddress = `${houseNumber} ${street}`;
  
      // Create a new person record in the database using Prisma
      const newPerson = await prisma.person.create({ 
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
          verified: false, // Set verified to false
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

