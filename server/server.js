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
let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be"
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774"

let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe"
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
        id: companyUserId,
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
//company
app.get('/api/getcompany', async (req, res) => {
    const data = await prisma.company.findUnique({
      where:{
        id: companyId,
      },}
    );
    

    res.json(data);
  });

//Create company
app.post('/api/createcompany',upload.none(), async (req, res) => {
  const{ companyName,companySize,username,password,streetAddress,cityName,countryName,zipCode,contactNum,emailAddress,biography,} = req.body
  await prisma.user.create({
    data: {
      username,
      password,
      streetAddress,
      cityName,
      countryName,
      zipCode,
      contactNum,
      emailAddress,
      biography,
      verified: false,
      role: {
        create: {
          roleName: "company"
        }
      },
      company: {
        create: {
          companyName,
          companySize,
          // Add more fields if needed
        }
      }
    }
  })
})

app.put('/api/updatecompany',upload.none(), async (req, res) => {
  //to do: include id in the request body
  try {
    // Extract data from the request body
    const{ companyName,companySize,username,password,streetAddress,cityName,countryName,zipCode,contactNum,emailAddress,biography,} = req.body
    // Construct the full street address

    const updateUser = await prisma.user.update({
      where: {
        id: companyUserId,
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
          company:{
              update:{
                where:{
                  id: companyId,
                },
                data:{
                  companyName,
                  companySize,
                }
                
              },
            },
        },
        include: {
          company: true,
        },
    })

    // Send a response with the newly created person
    res.status(201).json(updateUser);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(req.body)
  }

  
  })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

