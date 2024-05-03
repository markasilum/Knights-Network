const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getPersonCerts = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

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
  const userIdCookie = getUserIdFromJWT(req)

    try {
      // Extract data from the request body
      const { certName, certDetails } = req.body;
      let certPhoto
      if(certPhoto) {
        certPhoto = req.file.filename
      } 

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
  const deleteCert = async (req, res) => {
    try {
      const {id} = req.query
      const data = await prisma.certification.delete({
        where:{
          id: id
        }
      })
  
      res.status(200).json("deleted certification")
    } catch (error) {
      console.error("error deleting license", error)
    }
  }
module.exports = {
    getPersonCerts,
    createCert,
    updateCert,
    deleteCert
}