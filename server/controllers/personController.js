const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getPersonDetails = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

  const data = await prisma.person.findUnique({
    where: {
      userId: userIdCookie
    },
  });
  res.json(data);
};
const getPersonCredentials = async (req, res) => {
  const { id } = req.query;

  // console.log(id)

  const data = await prisma.person.findUnique({
    where: {
      id: id
    },
    include:{
      user: true,
      education: {
        include:{
          degree: true
        }
      },
      experience: true,
      certification:true,
      skills: {
        include:{
          skill: true
        }
      },
      personLicense: {
        include:{
          license:true
        }
      }
    }
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
      
      const hashPass = await bcrypt.hash(password,10)

    // Create a new person record in the database using Prisma
    const newPerson = await prisma.user.create({
      data: {
        username,
        password: hashPass,
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
  const userIdCookie = getUserIdFromJWT(req)

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

    
    let profPic;
    if (req.file != null) {
      profPic = req.file.filename;
    }

    const hashPass = await bcrypt.hash(password,10)

    const updatePerson = await prisma.user.update({
      where: {
       id:userIdCookie
      },
      data: {
        username,
        password: hashPass,
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
  getPersonCredentials,
};
