const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";
let personUserId2 = "bdb007b8-917f-4c93-ac85-2186970525d7"
let adminId = "88000b90-b82e-4860-a8e6-34545bda89cb"

let userId = personUserId;



const role = async (req, res) => {
    const data = await prisma.roles.findUnique({
      where: {
        userId: userId,
      },
    });
    res.json(data);
  }

  const userDetails =  async (req, res) => {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(data);
  }

module.exports ={
    role,
    userDetails
}