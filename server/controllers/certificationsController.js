const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userIdCookie = personUserId

const getPersonCerts = async (req, res) => {
    try {
      const certs = await prisma.certification.findMany({
        where: {
          person:{
            userId:userIdCookie
          }
        },select:{
          id:true,
          certDetails: true,
          certPhoto: true,
            certName:true
        }
      });

      const personCerts = certs.map(cert =>({
        id: cert.id,
        certDetails: cert.certDetails,
        certPhoto: cert.certPhoto,
        certName: cert.certName
      }));

      res.json(personCerts);

    } catch (error) {
      console.error("Error getting license:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
const createCert = async (req, res) => {
    try {
      // Extract data from the request body
      const { certName, certDetails } = req.body;
      const certPhoto = req.file.filename

      const newCert = await prisma.certification.create({
        data: {
          certName,
          certDetails,
          certPhoto,
          person: {
            connect: {
            userId: userIdCookie
            },
          },
        },
        include: {
          person: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newCert);
    } catch (error) {
      console.error("Error creating license:", error);
      res.status(500).json({ error: "Internal Server Error" });
      // console.log(req.body)
    }
  };

  const updateCert = async (req, res) => {
    try {
      // Extract data from the request body
      const { certId, certName, certDetails } = req.body;
      let certPhoto
      if(req.file != null){
       certPhoto = req.file.filename
      }

      const newCert = await prisma.certification.update({
        where:{
          id: certId
        },
        data: {
            certName,
            certDetails,
            certPhoto,
            
            },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newCert);
    } catch (error) {
      console.error("Error creating license:", error);
      res.status(500).json({ error: "Internal Server Error" });
      // console.log(req.body)
    }
  };

module.exports = {
    getPersonCerts,
    createCert,
    updateCert
}