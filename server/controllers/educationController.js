const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

const getEducation = async (req, res) => {
  try {
    const data = await prisma.education.findMany({
      where: {
        personId: personId,
      },
    });

    res.json(data);
  } catch (error) {
    console.error("Error getting degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createEducation = async (req, res) => {
  console.log(req.body);
  try {
    // Extract data from the request body
    const { schoolName, degree, qpi, startDate, endDate, awards } = req.body;
    console.log("startDate " + startDate);
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
    console.log(newEducation);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body)
  }
};

module.exports = {
  getEducation,
  createEducation,
};
