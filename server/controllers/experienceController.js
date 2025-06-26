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
          startDate:"desc"
        }
      });

      // console.log(data)
  
      res.json(data);
      
    }catch(error){
      console.error('Error getting degree:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const createExperience = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

  try {
    // Extract data from the request body
    const { jobTitle, companyName, jobDetails, startDate, endDate} = req.body;
    let startDateCon

    if(startDate=="null"){
      startDateCon= null
    }else{
      startDateCon= startDate
    }

    let endDateCon
    if(endDate=="null"){
      endDateCon= null
    }else{
      endDateCon= endDate
    }

    if(!jobTitle){
      throw new Error("Job Title is required")
    }

    if(!companyName){
      throw new Error("Company Name is required")
    }

    if(!startDateCon){
      throw new Error("Start date is required")
    }
    const newExperience = await prisma.experience.create({ 
      data:{
        jobTitle, 
        companyName, 
        jobDetails,
        startDate: startDateCon,
        endDate: endDateCon,
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
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: error.message });
    // console.log(req.body)
  }
}

const updateExperience = async (req, res) => {
  try{
    // Extract data from the request body
    const { expId, jobTitle, companyName, jobDetails, startDate, endDate} = req.body;
    let endDateCon
    if(endDate=="null"){
      endDateCon= null
    }else{
      endDateCon= endDate
    }

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
        endDate: endDateCon
      },
    });

    // Send a response with the newly created person
    res.status(201).json(updateExperience);
    // console.log(updateExperience)

  }catch(error){
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
  
}

const deleteExperience = async (req, res) => {
  try{
    const {id} = req.query
    const deleteExperience = await prisma.experience.delete({ 
      where:{
        id: id
      },
    });
    res.status(201).json("deleted experience");
  }catch{
    console.error('Error delete experience:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}

module.exports = {
    getPersonExperience,
    createExperience,
    updateExperience,
    deleteExperience
}
