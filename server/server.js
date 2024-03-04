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

let userId = personUserId

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003"
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe"

//get userId on login first
app.get('/api/getuserrole', async (req, res) => {
  const data = await prisma.roles.findUnique({
    where:{
      userId: userId,
    },}
  );
  

  res.json(data);
});

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
        id: userId,
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
      console.log(degreeIds)
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
      console.log(degrees)
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
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // console.log(req.body)
  }
});


app.post('/createjobpost',upload.none(), async (req, res) => {
  console.log(req.body)
  try {
    // Extract data from the request body
    let {jobTitle,jobDesc,employmentType,salary,jobLoc,workModel,numOfPosition,validity,isOpen,yearsExp,isAppLetterReq,degree,skill,license} = req.body;
    const parsedSalary = parseInt(salary);
    const parsedPos = parseInt(numOfPosition);

    let isOpenBoolean = true;
    if(isOpen ==="false"){
      isOpenBoolean = false
    }

    let appLettrBool = false
    if(isAppLetterReq ==="true"){
      isAppLetterReq = true
    }

    // for (let sk of skill) {
    //   console.log(sk.skillName);
    //   }
    // console.log(skill.skillName)
    // Create a new person record in the database using Prisma
    const newJobPost = await prisma.jobPost.create({
      data: {
        jobTitle,
        jobDesc,
        employmentType,
        salary: parsedSalary,
        jobLoc,
        workModel,
        numOfPosition: parsedPos,
        validity,
        isOpen: isOpenBoolean,
        yearsExp,
        isAppLetterReq: appLettrBool,
        company: {
          connect: {
            id: companyId,
          },
        },
        jobDegreeReq: {
          create: {
            degree: {
              connectOrCreate: {
                where: {
                  degreeName: degree,
                },
                create: {
                  degreeName: degree,
                },
              },
            },
          },
        },
        jobSkillsReq: {
          create: skill.map((sk) => ({
            skill: {
              connectOrCreate: {
                create:{
                  skillName: sk.skillName
                },
                where:{
                  skillName: sk.skillName
                },
                
              },
            },
          })),
        },
        jobLicenseReq:{
          create: license.map((li) => ({
            license: {
              connectOrCreate: {
                create:{
                  licenseName: li.licenseName
                },
                where:{
                  licenseName: li.licenseName
                },
                
              },
            },
          })),
        },
        
      },
      include: {
        company: true,
        jobDegreeReq: true,
        jobSkillsReq: true,
        jobLicenseReq: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newJobPost);
    console.log(newJobPost)
  } catch (error) {
    console.error('Error creating job post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // console.log(req.body)
  }
});

app.get('/api/getcompanyjobpost', async (req, res) => {
  try{    
    const data = await prisma.jobPost.findMany({
      where:{
        companyId:companyId,
      },
    });

    res.json(data);
    
  }catch(error){
    console.error('Error getting degree:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(req.body)

  }

})

app.get('/api/getjobdetails', async (req, res) => {
  try {
      // Extract the query parameter 'ids' from the request
      const { id } = req.query;
      // console.log(id)
      // Query the database using Prisma to fetch job post by their IDs
      const jobDetails = await prisma.jobPost.findUnique({
          where: {
              id: id 
          }
      });
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
      console.log(jobSkillsReq)
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
      console.log(jobLicenseReq)
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
    console.log(degreeNames);
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

    console.log(jobPosts)
    res.json(jobPosts);

  }catch(error){
    console.error('Error: ', error)
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

