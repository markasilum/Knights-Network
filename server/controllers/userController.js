const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');


const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};
//exclude password on get requests
function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}



const sendEmail = async (req, res) => {
  try {
    const {email} = req.body

    console.log("email sent to:", email)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'mecasilum@addu.edu.ph',
        pass: 'vwjyycjdfmiolqyi'
      }
    });

    const info = await transporter.sendMail({
      from: "mecasilum@addu.edu.ph",
      to: email,
      subject: "Knights Network Account Verification",
      text: "Knights Network Account Verified"
    });

    res.status(200).json(info);
    console.log("sent email");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const role = async (req, res) => {
    const userId = getUserIdFromJWT(req)

    const data = await prisma.roles.findUnique({
      where: {
        userId: userId,
      },
    });
    // const token = req.cookies.jwt;
    // const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");
    // console.log(decodedToken.id)
    res.json(data);
  }

  const deactivateAccount = async (req, res) => {
    const userId = getUserIdFromJWT(req);
  
    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data:{
        isArchived: true
      }
    });
    res.json(data);
  };

  const archiveUser = async (req, res) => {
    const {id} = req.query
  
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data:{
        isBanned: true
      }
    });
    res.json(data);
  };

  const unArchiveUser = async (req, res) => {
    const {id} = req.query
  
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data:{
        isBanned: false
      }
    });
    res.json(data);
  };

  const reactivateAccount = async (req, res) => {
    const { passwordParam, emailParam } = req.body;
    console.log(emailParam)

    const userId = await prisma.user.findFirst({
      where: {
        emailAddress: emailParam,
      },
    });

    const user = await prisma.user.update({
      where: {
       id: userId.id
      },
      data: {
        isArchived: false,
      },
    });

    console.log(userId)
    res.json(user);
  };

  const userDetails =  async (req, res) => {
    const userId = getUserIdFromJWT(req)
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include:{
        person: true,
        company: true,
      }
    });
    res.json(exclude(data,['password']));
  }

  const userSetting =  async (req, res) => {
    const userId = getUserIdFromJWT(req)

    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select:{
        setting: true
      }
    });
    res.json(data);
    // console.log(data)
  }

  const userSettingUpdate =  async (req, res) => {
    const userId = getUserIdFromJWT(req)

    const settingData = req.body
    console.log(settingData)
    const updatedAccountSettings = await prisma.accountSettings.upsert({
      where: {
        userId
      },
      update: settingData,
      create: {
        userId,
        ...settingData
      }
    });

    res.json(updatedAccountSettings);
  }

  const userIndexAlumni =  async (req, res) => {
    
    try {
      const data = await prisma.roles.findMany({
        where:{
          roleName: "alumni"
        },
        include:{
          user:{
            include:{
              person: {
                include: {
                  verifiReq: true
                }
              }
            }
          }
        },
        orderBy: {
          user: {
            person: {
              firstName: 'asc'
            }
          }
        }
      });
      res.status(201).json(data);
      
    } catch (error) {
      console.error("Error getting alumni index:", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const userIndexStudents =  async (req, res) => {
    
    try {
      const data = await prisma.roles.findMany({
        where:{
          roleName: "student"
        },
        include:{
          user:{
            include:{
              person: {
                include:{
                  verifiReq: true
                }
              }
            }
          }
        },orderBy: {
          user: {
            person: {
              firstName: 'asc'
            }
          }
        }
      });
      res.status(201).json(data);
      // console.log(data)
      
    } catch (error) {
      console.error("Error getting student index:", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const userIndexCompany =  async (req, res) => {
    try {
      const data = await prisma.roles.findMany({
        where:{
          roleName: "company"
        },
        include:{
          user:{
            include:{
              company: {
                include:{
                  verifiReq:true
                }
              }
            }
          }
        },
        orderBy:{
          user:{
            company:{
              companyName: 'asc'
            }
          }
        }
      });
      res.status(201).json(data);
      // console.log(data)
      
    } catch (error) {
      console.error("Error getting company index:", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const verifyUser =  async (req, res) => {
    console.log(req.query)
    try {
      const { id } = req.query;
      const data = await prisma.user.update({
        where:{
          id: id
        },
        data:{
          verified: true
        }
      });
      res.status(201).json(data);
      
      
    } catch (error) {
      console.error("Error getting company index:", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const resumeLog =  async (req, res) => {
    try {
      const { ownerId, viewerId, action } = req.body;
      const data = await prisma.resumeLogs.create({
        data:{
          viewerId: viewerId,
          ownerId:ownerId,
          action:action,
        }
      });
      res.status(201).json(data);
    } catch (error) {
      console.error("Error getting company index:", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const getResumeLog =  async (req, res) => {
    try {
      const {id} = req.query;
      const data = await prisma.resumeLogs.findMany({
        where:{
          ownerId: id
        },
        include:{
          resumeViewer:{
            select:{
              company: true,
              person:true,
            }
          }
        }
      });

      res.status(201).json(data);
    } catch (error) {
      console.error("Error getting resume log:", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
  }


module.exports ={
    role,
    userDetails,
    userIndexAlumni,
    userIndexStudents,
    userIndexCompany,
    verifyUser,
    userSetting,
    userSettingUpdate,
    deactivateAccount,
    reactivateAccount,
    resumeLog,
    getResumeLog,
    archiveUser,
    unArchiveUser,
    sendEmail,
}