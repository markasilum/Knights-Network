const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let personId2 = "cd8dbd9b-6ac3-4bbf-8d55-c4ceb339dac8";

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let personUserId2 = "bdb007b8-917f-4c93-ac85-2186970525d7";

const getPersonDetails = async (req, res) => {
  const data = await prisma.person.findUnique({
    where: {
      id: personId2,
    },
  });
  res.json(data);
};

const createPerson = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      username,
      password,
      streetAddress,
      cityName,
      zipCode,
      countryName,
      emailAddress,
      contactNum,
      biography,
      role,
    } = req.body;

    const profPic = req.files["profPic"]
      ? req.files["profPic"][0].filename
      : null;
    const idPhoto = req.files["idPhoto"]
      ? req.files["idPhoto"][0].filename
      : null;

    // Create a new person record in the database using Prisma
    const newPerson = await prisma.user.create({
      data: {
        username,
        password,
        streetAddress,
        cityName,
        zipCode,
        countryName,
        emailAddress,
        contactNum,
        biography,
        profPic,
        verified: false,
        person: {
          create: {
            firstName,
            middleName,
            lastName,
            suffix,
            verifiReq: {
              create: {
                idPhoto: idPhoto,
              },
            },
          },
        },
        role: {
          create: {
            roleName: role,
          },
        },
      },
      include: {
        person: true,
        role: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newPerson);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePerson = async (req, res) => {
  //to do: include id in the request body
  try {
    // Extract data from the request body
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      username,
      password,
      streetAddress,
      cityName,
      zipCode,
      countryName,
      emailAddress,
      contactNum,
      biography,
      personId,
    } = req.body;

    const profPic = req.file.filename;

    const updatePerson = await prisma.user.update({
      where: {
        id: personUserId,
      },
      data: {
        username,
        password,
        streetAddress,
        cityName,
        zipCode,
        countryName,
        emailAddress,
        contactNum,
        biography,
        profPic,
        person: {
          update: {
            where: {
              id: personId,
            },
            data: {
              firstName,
              middleName,
              lastName,
              suffix,
            },
          },
        },
      },
      include: {
        person: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(updatePerson);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal Server Error" });
    console.log(req.body);
  }
};
module.exports = {
  getPersonDetails,
  createPerson,
  updatePerson,
};
