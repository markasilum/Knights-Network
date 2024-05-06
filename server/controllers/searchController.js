const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};
const searchJobPost = async (req, res) => {
  try {
    const { search } = req.query;

    const jobTitle = await prisma.jobPost.findMany({
      where: {
        jobTitle: {
          contains: search,
        },
      },
    });

    const jobTitleArr = jobTitle.map(item=> item.id)

    const jobPostSkill = await prisma.jobSkillsReq.findMany({
        where: {
          skill:{
            skillName:{
                contains: search
            }
          }
        },
        select:{
            jobPost: true,
        }
      });

      const jobPostSkillArr = jobPostSkill.map(item => item.jobPost.id);


      const jobPostLicense = await prisma.jobLicenseReq.findMany({
        where: {
          license:{
            licenseName:{
                contains: search
            }
          }
        },
        select:{
            jobPost: true,
        }
      });

      const jobPostLicenseArr = jobPostLicense.map(item => item.jobPost.id);

      const jobPostDegree = await prisma.jobDegreeReq.findMany({
        where: {
          degree:{
            degreeName:{
                contains: search
            }
          }
        },
        select:{
            jobPost: true,
        }
      });

      const jobPostDegreeArr = jobPostDegree.map(item => item.jobPost.id);

      const finalSetUserIdArray = [
        ...new Set([
          ...jobTitleArr,
          ...jobPostLicenseArr,
          ...jobPostSkillArr,
          ...jobPostDegreeArr,
        ]),
      ];

      const jobDetails = await prisma.jobPost.findMany({
        where: {
            id: {
              in: finalSetUserIdArray
            },
        },
        include:{
            company: true
        }
      });


    res.status(200).json(jobDetails);
  } catch (error) {}
};
module.exports = {
  searchJobPost,
};
