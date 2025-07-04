const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getEducation = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)
  try {
    const data = await prisma.education.findMany({
      where: {
        person:{
          user:{
            id: userIdCookie
          }
        }
      },
      include:{
        degree:true
      },orderBy:{
        startDate:"desc"
      }
    });

    res.json(data);
  } catch (error) {
    console.error("Error getting degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createEducation = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)
  try {
    // Extract data from the request body
    const { schoolName, degree, qpi, startDate, endDate, awards } = req.body;
    let startDateCon
    let endDateCon
    if(startDate=="null"){
      startDateCon= null
    }else{
      startDateCon= startDate
    }

    if(endDate=="null"){
      endDateCon= null
    }else{
      endDateCon= endDate
    }

    if(!schoolName){
      throw new Error("School Name is required")
    }
    if(!degree){
      throw new Error("Degree is required")
    }

    if(startDateCon==null){
      throw new Error("Start date is required")
    }
    const newEducation = await prisma.education.create({
      data: {
        schoolName,
        qpi,
        startDate,
        endDate:endDateCon,
        awards,
        person: {
          connect: {
            userId: userIdCookie
          },
        },
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
      include: {
        person: true,
        degree: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newEducation);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: error.message });
    // console.log(req.body)
  }
};

const updateEducation = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)
  try {
    // Extract data from the request body
    const { id, schoolName, degree, qpi, startDate, endDate, awards } = req.body;
    let startDateCon
    let endDateCon
    if(startDate=="null"){
      startDateCon= null
    }else{
      startDateCon= startDate
    }

    if(endDate=="null"){
      endDateCon= null
    }else{
      endDateCon= endDate
    }

    if(!schoolName){
      throw new Error("School Name is required")
    }
    if(!degree){
      throw new Error("Degree is required")
    }

    if(startDateCon==null){
      throw new Error("Start date is required")
    }
    const newEducation = await prisma.education.update({
      where:{
        id:id
      },
      data: {
        schoolName,
        qpi,
        startDate: startDateCon,
        endDate: endDateCon,
        awards,
        person: {
          connect: {
            userId: userIdCookie
          },
        },
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
      include: {
        person: true,
        degree: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newEducation);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: error.message});
    // console.log(req.body)
  }
};

const deleteEducation = async (req, res) => {
  try {
    const {id} = req.query
    const data = await prisma.education.delete({
      where:{
        id: id
      }
    })

    res.status(200).json("deleted education")
  } catch (error) {
    console.error("error deleting education", error)
  }
}

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
