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

      let licensePic
      if(req.file != null){
      licensePic = req.file.filename
    }

    let licenseValidityCon
    if(licenseValidity=="null"){
      licenseValidityCon= null
    }else{
      licenseValidityCon= licenseValidity
    }

      const newLicense = await prisma.personLicense.create({
        data: {
          licenseValidity:licenseValidityCon,
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
    try {
      // Extract data from the request body
      const { licId, licenseValidity, licenseName } = req.body;
      let licensePic
      if(req.file != null){
      licensePic = req.file.filename
    }
    let licenseValidityCon
    if(licenseValidity=="null"){
      licenseValidityCon= null
    }else{
      licenseValidityCon= licenseValidity
    }

    if(!licenseName){
      throw new Error("License name is required")
    }

    if(!licenseValidityCon){
      throw new Error("License validity is required")
    }

      const updateLicense = await prisma.personLicense.update({
        where:{
          id: licId
        },
        data: {
          licenseValidity:licenseValidityCon,
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
      res.status(500).json({ error: error.message });
      // console.log(req.body)
    }
  };

  const deleteLicense = async (req, res) => {
    try {
      const {id} = req.query
      const data = await prisma.personLicense.delete({
        where:{
          id: id
        }
      })
  
      res.status(200).json("deleted license")
    } catch (error) {
      console.error("error deleting license", error)
    }
  }
module.exports = {
    createPersonLicense,
    getPersonLicenses,
    updatePersonLicense,
    deleteLicense
}