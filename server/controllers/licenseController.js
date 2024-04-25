const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getPersonLicenses = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

    try {
      const licenses = await prisma.personLicense.findMany({
        where: {
          person:{
            userId: userIdCookie
          }
        },select: {
          id:true,
          licensePic: true,
          licenseValidity: true,
            license: {
              select: {
                licenseName: true
              }
            }
          }
      });
      const personLicenses = licenses.map(license => ({
        id: license.id,
        licensePic: license.licensePic,
        licenseValidity: license.licenseValidity,
        licenseName: license.license.licenseName
      }));
      res.json(personLicenses);
    } catch (error) {
      console.error("Error getting license:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
const createPersonLicense = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

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
              userId: userIdCookie
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
  const updatePersonLicense = async (req, res) => {
    console.log(req.body)
    try {
      // Extract data from the request body
      const { licId, licenseValidity, licenseName } = req.body;
      let licensePic
      if(req.file != null){
      licensePic = req.file.filename
    }

      const updateLicense = await prisma.personLicense.update({
        where:{
          id: licId
        },
        data: {
          licenseValidity,
          licensePic,
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
          license: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(updateLicense);
    } catch (error) {
      console.error("Error updating license:", error);
      res.status(500).json({ error: "Internal Server Error" });
      // console.log(req.body)
    }
  };
module.exports = {
    createPersonLicense,
    getPersonLicenses,
    updatePersonLicense,
}