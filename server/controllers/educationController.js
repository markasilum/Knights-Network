const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";

const getEducation = async (req, res) => {
  try {
    const data = await prisma.education.findMany({
      where: {
        personId: personId,
      },
      include:{
        degree:true
      }
    });

    res.json(data);
  } catch (error) {
    console.error("Error getting degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createEducation = async (req, res) => {
  try {
    // Extract data from the request body
    const { schoolName, degree, qpi, startDate, endDate, awards } = req.body;
    // console.log("startDate " + startDate);
    // Create a new person record in the database using Prisma
    const newEducation = await prisma.education.create({
      data: {
        schoolName,
        qpi,
        startDate,
        endDate,
        awards,
        person: {
          connect: {
            id: personId,
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
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body)
  }
};

const updateEducation = async (req, res) => {
  try {
    // Extract data from the request body
    const { id, schoolName, degree, qpi, startDate, endDate, awards } = req.body;
    // console.log("startDate " + startDate);
    // Create a new person record in the database using Prisma
    const newEducation = await prisma.education.update({
      where:{
        id:id
      },
      data: {
        schoolName,
        qpi,
        startDate,
        endDate,
        awards,
        person: {
          connect: {
            id: personId,
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
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body)
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
};
