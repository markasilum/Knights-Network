const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

const getPersonLicenses = async (req, res) => {
    try {
      const licenses = await prisma.personLicense.findMany({
        where: {
          personId: personId,
        },select: {
            license: {
              select: {
                licenseName: true
              }
            }
          }
      });
      const personLicenses = licenses.map(license => license.license.licenseName);
      res.json(personLicenses);
    } catch (error) {
      console.error("Error getting license:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
const createPersonLicense = async (req, res) => {
    try {
      // Extract data from the request body
      const { licenseValidity, licenseName } = req.body;
      const licensePic = req.file.filename

      const newLicense = await prisma.personLicense.create({
        data: {
          licenseValidity,
          licensePic,
          person: {
            connect: {
              id: personId,
            },
          },
          license: {
            connectOrCreate: {
              where: {
                licenseName: licenseName,
              },
              create: {
                licenseName: licenseName,
              },
            },
          },
        },
        include: {
          person: true,
          license: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newLicense);
    } catch (error) {
      console.error("Error creating license:", error);
      res.status(500).json({ error: "Internal Server Error" });
      // console.log(req.body)
    }
  };

module.exports = {
    createPersonLicense,
    getPersonLicenses
}