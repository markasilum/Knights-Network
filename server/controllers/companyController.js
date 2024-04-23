const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getCompanyDetails = async (req, res) => {

  const userId = getUserIdFromJWT(req)

  const data = await prisma.company.findUnique({
    where: {
      userId: userId
    },
  });

  res.json(data);
};

const createCompany = async (req, res) => {
  const {
    companyName,
    companySize,
    username,
    password,
    streetAddress,
    cityName,
    countryName,
    zipCode,
    contactNum,
    emailAddress,
    biography,
  } = req.body;

  const profPic = req.files["profPic"]
    ? req.files["profPic"][0].filename
    : null;
  const secRegistration = req.files["secRegistration"]
    ? req.files["secRegistration"][0].filename
    : null;
  const dtiRegistration = req.files["dtiRegistration"]
    ? req.files["dtiRegistration"][0].filename
    : null;
  const businessPermit = req.files["businessPermit"]
    ? req.files["businessPermit"][0].filename
    : null;

    const hashPass = await bcrypt.hash(password,10)
  await prisma.user.create({
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
      role: {
        create: {
          roleName: "company",
        },
      },
      company: {
        create: {
          companyName,
          companySize,
          verifiReq: {
            create: {
              secRegistration: secRegistration,
              dtiRegistration: dtiRegistration,
              businessPermit: businessPermit,
            },
          },
        },
      },
    },
  });
};

const updateCompany = async (req, res) => {
  const userId = getUserIdFromJWT(req)

  try {
    // Extract data from the request body
    const {
      companyName,
      companySize,
      username,
      password,
      streetAddress,
      cityName,
      countryName,
      zipCode,
      contactNum,
      emailAddress,
      biography,
    } = req.body;

    let profPic;
    if (req.file != null) {
      profPic = req.file.filename;
    }

    //hash password
    const hashPass = await bcrypt.hash(password,10)

    const updateUser = await prisma.user.update({
      where: {
        id: userId
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
        profPic,
        biography,
        company: {
          update: {
            where: {
              userId: userId
            },
            data: {
              companyName,
              companySize,
            },
          },
        },
      },
      include: {
        company: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(updateUser);
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getCompanyDetails,
  createCompany,
  updateCompany,
};
