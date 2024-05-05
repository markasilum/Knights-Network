const { Struct, StructError, object, string, number, assert, pattern, size, refine, optional, nullable } = require("superstruct");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const isEmail = refine(string(), 'isEmail', (value) => /\S+@\S+\.\S+/.test(value));
const phPhoneNum = pattern(string(),  /^(0|\+63|\+?63|0)?[0-9]{10}$/)
const password = size(string(),6,15)

const CreateCompany = object({
  username: string(),
  password: password,
  streetAddress: optional(string()),
  cityName: optional(string()),
  countryName: optional(string()),
  zipCode: optional(string()),
  contactNum: phPhoneNum,
  emailAddress: isEmail,
  biography: optional(string()),
  companyName: string(),
  companySize: optional(string()),
  industryName:string(),
  firstName:string(),
  middleName:optional(string()),
  lastName:string(),
  suffix:optional(string()),
  personEmail: isEmail,
  personPhone:phPhoneNum,
  positionName:string()
});

function handleValidationError(error, res) {
  if (error instanceof StructError) {
    // Handle Superstruct validation errors
    console.error("Validation Error:", error.message);
    console.error("Path:", error.path);
    console.error("Failed Value:", error.value);
    console.error("Type:", error.type);
    return res.status(400).json({ error:`Error at: ${error.path} Value:${error.value}` });
  } else {
    let errorMessage;
    if (error.message === "Password must be at least 6 characters long") {
      errorMessage = "Password must be at least 6 characters long";
    } else if (error.message === "SEC Registration is required") {
      errorMessage = "SEC Registration is required";
    } else if (error.message === "DTI Registration is required") {
      errorMessage = "DTI Registration is required";
    } else if (error.message === "Business Permit is required") {
      errorMessage = "Business Permit is required";
    } else if (error.message === "Username and Email are already taken") {
      errorMessage = "Username and Email are already taken";
    } else if (error.message === "Email already taken") {
      errorMessage = "Email already taken";
    } else if (error.message === "Username already taken") {
      errorMessage = "Username already taken";
    } else if(error.message =="Please enter a valid Philippine contact number"){
      errorMessage = "Please enter a valid Philippine contact number";
    }else if(error.message == "Person Contact invalid phone"){
      errorMessage = "Person Contact invalid phone";
    }
    else {
      errorMessage = "An unexpected error occurred";
    }
    res.status(400).json({ error: errorMessage });
  }
}

const getCompanyDetails = async (req, res) => {
  const userId = getUserIdFromJWT(req);

  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
  });

  res.json(data);
};

const getContact = async (req, res) => {
  const userId = getUserIdFromJWT(req);

  try {
    const data = await prisma.companyContactPerson.findMany({
      where: {
        company:{
          userId: userId
        }
      },
      include:{
        person: true
      }
    });
  
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error(error)
  }
};

const createCompany = async (req, res) => {
  console.log(req.body)
  try {
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
      industryName,
      firstName,
      middleName,
      lastName,
      suffix,
      personEmail,
      personPhone,
      positionName
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
    let hashPass = "";
      if(password.length >= 6){
        hashPass = await bcrypt.hash(password, 10);
      }else{
        throw new Error("Password must be at least 6 characters long");
      }

      if (!secRegistration) {
        throw new Error("SEC Registration is required");
      }

      if (!dtiRegistration) {
        throw new Error("DTI Registration is required");
      }
      if (!businessPermit) {
        throw new Error("Business Permit is required");
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

    var contactNumberPattern = /^(0|\+63|\+?63|0)?[0-9]{10}$/;
    if (!contactNumberPattern.test(contactNum)) {
      throw new Error("Please enter a valid Philippine contact number");
    }
    if (!contactNumberPattern.test(personPhone)) {
      throw new Error("Person Contact invalid phone");
    }  
    

  assert(req.body, CreateCompany)
   const createdUser =  await prisma.user.create({
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
            industry: {//compIndustry
              create: {
                industry:{//list of industry
                  connectOrCreate:{
                    where: {
                        industryName,
                    },
                    create: {
                        industryName,
                    },

                  }
                }
              },
            },
            contactPerson:{
              create:{
                positionName,
                email: personEmail,
                phone: personPhone,
                person:{
                  create:{
                    firstName,
                    middleName,
                    lastName,
                    suffix
                  }
                }
              }
            }
          },
        },
      },
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error)
    handleValidationError(error, res);
  }
};

const updateCompany = async (req, res) => {
  const userId = getUserIdFromJWT(req);

  try {
    // Extract data from the request body
    const {
      companyName,
      companySize,
      industryName,
      username,
      password,
      streetAddress,
      cityName,
      countryName,
      zipCode,
      contactNum,
      emailAddress,
      biography,
      firstName,
      middleName,
      lastName,
      suffix,
      personEmail,
      personPhone,
      positionName
    } = req.body;

    const compId = await prisma.company.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });
    console.log(compId);
    let profPic;
    if (req.file != null) {
      profPic = req.file.filename;
    }

    //hash password
    let hashPass = "";
    if (password) {
      if(password.length >= 6){
        hashPass = await bcrypt.hash(password, 10);
      }else{
        throw new Error("Password must be at least 6 characters long");
      }
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
      if(checkEmail.id != userId && checkUsername.id != userId){
        throw new Error("Username and Email are already taken");
      }
    }
    if (checkEmail) {
      if(checkEmail.id != userId){
        throw new Error("Email already taken");
      }
    }

    if (checkUsername) {
      if(checkUsername.id != userId){
        throw new Error("Username already taken");
      }
    }

    var contactNumberPattern = /^(0|\+63|\+?63|0)?[0-9]{10}$/;
    if (!contactNumberPattern.test(contactNum)) {
      throw new Error("Please enter a valid Philippine contact number");
    } 

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
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
        profPic,
        biography,
        company: {
          update: {
            where: {
              userId: userId,
            },
            data: {
              companyName,
              companySize,
              industry: {
                connectOrCreate: {
                  where: {
                    companyId: compId.id,
                  },
                  create: {
                    industry: {
                      connectOrCreate: {
                        where:{
                          industryName
                        },
                        create:{
                          industryName
                        }
                      },
                    },
                  },
                },
              },
              contactPerson:{
                connectOrCreate:{
                  where:{
                    companyId: compId.id
                  },
                  create:{
                    positionName,
                    email: personEmail,
                    phone: personPhone,
                    person:{
                      create:{
                        firstName,
                        middleName,
                        lastName,
                        suffix
                      }
                  }
                }
              }
            }
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
    console.error("Error updating company:", error);
    handleValidationError(error, res);
  }
};

const viewCompanyProfile = async (req, res) => {
  try {
    
    const {id} = req.query
    const data = await prisma.company.findUnique({
    where:{
      id: id
    },
    include:{
      user:true,
      contactPerson:{
        include:{
          person:true
        }
      },
      jobPost:true,
      industry: true
    }
    })
    res.status(200).json(data)
  } catch (error) {
    
  }
}

const addContact = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

  try {
    const
    { 
      firstName,
      middleName,
      lastName,
      suffix,
      personEmail,
      personPhone,
      positionName
    } = req.body
    console.log(req.body)

    const data = await prisma.companyContactPerson.create({
      data:{
        email: personEmail,
        phone: personPhone,
        positionName,
        company:{
          connect:{
            userId: userIdCookie
          }
        },
        person:{
          create:{
            firstName,
            middleName,
            lastName,
            suffix,
          }
        },
      }
    })
   

    res.status(200).json(data)
  } catch (error) {
    console.log(error) 
  }

}

const updateContact = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

  try {
    const
    { 
      id,
      firstName,
      middleName,
      lastName,
      suffix,
      personEmail,
      personPhone,
      positionName
    } = req.body
    console.log(req.body)

    const data = await prisma.companyContactPerson.update({
      where:{
        id: id
      },
      data:{
        email: personEmail,
        phone: personPhone,
        positionName,
        company:{
          connect:{
            userId: userIdCookie
          }
        },
        person:{
          create:{
            firstName,
            middleName,
            lastName,
            suffix,
          }
        },
      }
    })
   

    res.status(200).json(data)
  } catch (error) {
    console.log(error) 
  }

}
module.exports = {
  getCompanyDetails,
  createCompany,
  updateCompany,
  getContact,
  viewCompanyProfile,
  addContact,
  updateContact
};
