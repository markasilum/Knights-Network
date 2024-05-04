const { object, string, number, assert, pattern, size, refine, optional } = require("superstruct");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const PDFDocument = require("pdfkit");

const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60; //3 days

function DateToWords(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${year}`;
}

const isEmail = refine(string(), 'isEmail', (value) => /\S+@\S+\.\S+/.test(value));
const phPhoneNum = pattern(string(),  /^(0|\+63|\+?63|0)?[0-9]{10}$/)
const password = size(string(),6,15)

const User = object({
  username: string(),
  password: password,
  streetAddress: optional(string()),
  cityName: optional(string()),
  countryName: optional(string()),
  zipCode: optional(string()),
  contactNum: phPhoneNum,
  emailAddress: isEmail,
  biography: optional(string()),
  firstName: string(),
  middleName: string(),
  lastName: string(),
  suffix: optional(string()),
  maindenLastName: optional(string()),
  maritalStatus: optional(string()),
  birthdate: optional(string()),
  role: string(),
});

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getPersonDetails = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req);

  const data = await prisma.person.findUnique({
    where: {
      userId: userIdCookie,
    },
  });
  res.json(data);
};
const getPersonCredentials = async (req, res) => {
  const { id } = req.query;

  const data = await prisma.person.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      education: {
        include: {
          degree: true,
        },
      },
      experience: true,
      certification: true,
      skills: {
        include: {
          skill: true,
        },
      },
      personLicense: {
        include: {
          license: true,
        },
      },
    },
  });
  res.json(data);
};

const createPerson = async (req, res) => {
  try {
    
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
      birthdate,
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
    
      


    const checkEmail = await prisma.user.findFirst({
      where: {
        emailAddress: emailAddress,
      },
    });

    const checkUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    var contactNumberPattern = /^(0|\+63|\+?63|0)?[0-9]{10}$/;
    if (!contactNumberPattern.test(contactNum)) {
      throw new Error("Please enter a valid Philippine contact number");
    } 

    if (checkEmail && checkUsername) {
      throw new Error("Username and Email are already taken");
    }
    if (checkEmail) {
      throw new Error("Email already taken");
    }

    if (checkUsername) {
      throw new Error("Username already taken");
    }

    // if (!idPhoto) {
    //   throw new Error("Verification requirement is required");
    // }
    assert(req.body, User);
    const hashPass = await bcrypt.hash(password, 10);
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
            birthdate,
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
        setting: {
          create: {
            allowDownloadResume: true,
            allowViewResume: true,
            isJobSearching: true,
            receiveJobReco: true,
          },
        },
      },
      include: {
        person: true,
        role: true,
      },
    });

    // Send a response with the newly created person
    res.cookie("email", emailAddress, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json(newPerson);
  } catch (error) {
    const knownErrors = {
      "Username and Email are already taken": 400,
      "Email already taken": 400,
      "Username already taken": 400,
      "Please enter a valid Philippine contact number": 400,
      "Verification requirement is required": 400,
    };

    if (error.message in knownErrors) {
      const statusCode = knownErrors[error.message];
      return res.status(statusCode).json({ error: error.message });
    }

    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePerson = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req);
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

    let hashPass = "";
    if (password) {
      hashPass = await bcrypt.hash(password, 10);
    } 

    const checkEmail = await prisma.user.findFirst({
      where: {
        emailAddress: emailAddress,
      },
    });

    const checkUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (checkEmail && checkUsername) {
      if(checkEmail.id != userIdCookie && checkUsername.id != userIdCookie){
        throw new Error("Username and Email are already taken");
      }
    }
    if (checkEmail) {
      if(checkEmail.id != userIdCookie){
        throw new Error("Email already taken");
      }
    }

    if (checkUsername) {
      if(checkUsername.id != userIdCookie){
        throw new Error("Username already taken");
      }
    }

    var contactNumberPattern = /^(0|\+63|\+?63|0)?[0-9]{10}$/;
    if (!contactNumberPattern.test(contactNum)) {
      throw new Error("Please enter a valid Philippine contact number");
    } 


    const updatePerson = await prisma.user.update({
      where: {
        id: userIdCookie,
      },
      data: {
        username,
        ...(hashPass && { password: hashPass }),
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
     if (error.message === "Username and Email are already taken") {
      return res.status(400).json({ error: error.message });
    } else if (
      error.message === "Email already taken" ||
      error.message === "Username already taken"
    ) {
      return res.status(400).json({ error: error.message });
    } else if (error.message === "Verification requirement is required") {
      return res.status(400).json({ error: error.message });
    }else if (error.message === "Please enter a valid Philippine contact number") {
      return res.status(400).json({ error: error.message });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const resumePDF = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await prisma.person.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: true,
        education: {
          include: {
            degree: true,
          },
        },
        experience: true,
        certification: true,
        skills: {
          include: {
            skill: true,
          },
        },
        personLicense: {
          include: {
            license: true,
          },
        },
      },
    });

    const doc = new PDFDocument({ size: "LETTER", margin: 72 * 0.5 });
    doc.registerFont("Gotham-Medium", "./font/Gotham-Medium.ttf");
    doc.registerFont("Gotham-Book", "./font/Gotham-Book.ttf");

    doc
      .fontSize(12)
      .font("Gotham-Medium")
      .text(data.firstName + " " + data.middleName + " " + data.lastName, {
        align: "center",
      });
    doc.fontSize(11);
    doc
      .font("Gotham-Book")
      .text(data.user.contactNum + " | " + data.user.emailAddress, {
        align: "center",
      });

    if (data.experience.length != 0) {
      doc.moveDown();
      doc.font("Gotham-Medium").text("Experience", {
        underline: true,
        align: "center",
      });
      doc.moveDown();
      data.experience.map(
        (item) => (
          doc.font("Gotham-Medium").text(item.jobTitle),
          doc.font("Gotham-Book").text(item.companyName),
          doc
            .font("Gotham-Book")
            .text(
              DateToWords(item.startDate) + " - " + DateToWords(item.endDate)
            ),
          (detail = item.jobDetails.replace(/\r/g, "")),
          doc.list(detail.split("\n"), {
            bulletRadius: 2,
            indent: 10,
          }),
          doc.moveDown()
        )
      );
    }

    if (data.skills.length != 0) {
      doc.font("Gotham-Medium").text("Skills", {
        underline: true,
        align: "center",
      });
      doc.moveDown();

      const skillNames = data.skills.map((skill) => skill.skill.skillName);

      doc.font("Gotham-Book").list(skillNames, {
        bulletRadius: 2,
      });
    }

    if (data.education.length != 0) {
      doc.moveDown();
      doc.font("Gotham-Medium").text("Education", {
        underline: true,
        align: "center",
      });
      doc.moveDown();

      data.education.map(
        (item) => (
          doc.font("Gotham-Medium").text(item.schoolName),
          doc.font("Gotham-Book").text(item.degree.degreeName),
          doc
            .font("Gotham-Book")
            .text(
              DateToWords(item.startDate) + " - " + DateToWords(item.endDate)
            ),
          doc.font("Gotham-Book").text("QPI: " + item.qpi),
          doc.font("Gotham-Book").text(item.awards),
          doc.moveDown()
        )
      );
    }

    if (data.personLicense.length != 0) {
      doc.font("Gotham-Medium").text("Licenses", {
        underline: true,
        align: "center",
      });
      const licenseNames = data.personLicense.map(
        (item) => item.license.licenseName
      );
      doc.font("Gotham-Book").list(licenseNames, {
        bulletRadius: 2,
      });
    }

    if (data.certification.length != 0) {
      doc.font("Gotham-Medium").text("Certifications", {
        underline: true,
        align: "center",
      });
      doc.moveDown();

      const certifications = data.certification.map((item) => item.certName);
      doc.font("Gotham-Book").list(certifications, {
        bulletRadius: 2,
      });
    }

    doc.end();
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="example.pdf"'
      );
      res.send(pdfData);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPersonDetails,
  createPerson,
  updatePerson,
  getPersonCredentials,
  resumePDF,
};
