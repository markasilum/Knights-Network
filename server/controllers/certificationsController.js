const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

const getPersonCerts = async (req, res) => {
    try {
      const certs = await prisma.certification.findMany({
        where: {
          personId: personId,
        },select:{
            certName:true
        }
      });

      const personCerts = certs.map(cert => cert.certName);

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
                id: personId,
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

module.exports = {
    getPersonCerts,
    createCert
}