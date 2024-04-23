const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};
const getPersonExperience = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

    try{    
      const data = await prisma.experience.findMany({
        where:{
          person:{
            userId: userIdCookie
          }
        },orderBy:{
          endDate:"desc"
        }
      });

      // console.log(data)
  
      res.json(data);
      
    }catch(error){
      console.error('Error getting degree:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
    }
  }

const createExperience = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

  try {
    // Extract data from the request body
    const { jobTitle, companyName, jobDetails, startDate, endDate} = req.body;
    console.log("startDate "+startDate)
    // Create a new person record in the database using Prisma
    const newExperience = await prisma.experience.create({ 
      data:{
        jobTitle, 
        companyName, 
        jobDetails,
        startDate,
        endDate,
        person:{
          connect:{
              userId:userIdCookie,
          }
        },
      },
      include: {
        person: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newExperience);
    console.log(newExperience)
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // console.log(req.body)
  }
}

const updateExperience = async (req, res) => {
  try{
    // Extract data from the request body
    const { expId, jobTitle, companyName, jobDetails, startDate, endDate} = req.body;
    // Create a new person record in the database using Prisma
    const updateExperience = await prisma.experience.update({ 
      where:{
        id: expId
      },
      data:{
        jobTitle, 
        companyName, 
        jobDetails,
        startDate,
        endDate,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(updateExperience);
    // console.log(updateExperience)

  }catch{
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
}

module.exports = {
    getPersonExperience,
    createExperience,
    updateExperience
}
