const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";
let personUserId2 = "bdb007b8-917f-4c93-ac85-2186970525d7"
let adminId = "88000b90-b82e-4860-a8e6-34545bda89cb"
const jwt = require("jsonwebtoken");

let userId = companyUserId;
const getUserIdFromJWT = (req) => {
  // Extract JWT from request (assuming it's stored in a cookie)
  const token = req.cookies.jwt;

  // Decode the JWT to extract userId
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  // Extract userId from decoded JWT payload
  return decodedToken.userId;
};

const role = async (req, res) => {
    const data = await prisma.roles.findUnique({
      where: {
        userId: userId,
      },
    });
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");
    console.log(decodedToken.id)
    res.json(data);
  }

  const userDetails =  async (req, res) => {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include:{
        person: true,
        company: true,
      }
    });
    res.json(data);
  }

  const userSetting =  async (req, res) => {
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
        }
      });
      res.status(201).json(data);
      console.log(data)
      
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

  const login =  async (req, res) => {
    console.log(req.query)
    try {
      
      
      
    } catch (error) {
      console.error("Error getting company index:", error);
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
    userSettingUpdate
}