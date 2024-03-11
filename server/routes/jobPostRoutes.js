const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer = require("multer");
const router = express.Router();
const prisma = new PrismaClient();
const upload = multer();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

router.get('/index', async (req, res) => {
  try{
    const jobPosts = await prisma.jobPost.findMany({
      orderBy:[
        {
          dateUpdated: 'desc'
        },
        {
          dateCreated: 'desc'
        }
      ],
      include:{
        company: true,
        jobDegreeReq: {
          include:{
            degree: true
          }
        }

      }
    })

    // console.log(jobPosts)
    res.json(jobPosts);

  }catch(error){
    console.error('Error: ', error)
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.get("/company/index", async (req, res) => {
  try {
    const data = await prisma.jobPost.findMany({
      where: {
        companyId: companyId,
      },
    });
    res.json(data);
  } catch (error) {
    console.error("Error getting degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
    console.log(req.body);
  }
});

router.post("/create", upload.none(), async (req, res) => {
  console.log(req.body);
  try {
    // Extract data from the request body
    let {
      jobTitle,
      jobDesc,
      employmentType,
      salary,
      jobLoc,
      workModel,
      numOfPosition,
      validity,
      isOpen,
      yearsExp,
      isAppLetterReq,
      degree,
      skill,
      license,
    } = req.body;
    const parsedSalary = parseInt(salary);
    const parsedPos = parseInt(numOfPosition);

    let isOpenBoolean = true;
    if (isOpen === "false") {
      isOpenBoolean = false;
    }

    let appLettrBool = false;
    if (isAppLetterReq === "true") {
      isAppLetterReq = true;
    }
    const newJobPost = await prisma.jobPost.create({
      data: {
        jobTitle,
        jobDesc,
        employmentType,
        salary: parsedSalary,
        jobLoc,
        workModel,
        numOfPosition: parsedPos,
        validity,
        isOpen: isOpenBoolean,
        yearsExp,
        isAppLetterReq: appLettrBool,
        company: {
          connect: {
            id: companyId,
          },
        },
        jobDegreeReq: {
          create: {
            degree: {
              connectOrCreate: {
                where: {
                  degreeName: degree,
                },
                create: {
                  degreeName: degree,
                },
              },
            },
          },
        },
        jobSkillsReq: {
          create: skill.map((sk) => ({
            skill: {
              connectOrCreate: {
                create: {
                  skillName: sk.skillName,
                },
                where: {
                  skillName: sk.skillName,
                },
              },
            },
          })),
        },
        jobLicenseReq: {
          create: license.map((li) => ({
            license: {
              connectOrCreate: {
                create: {
                  licenseName: li.licenseName,
                },
                where: {
                  licenseName: li.licenseName,
                },
              },
            },
          })),
        },
      },
      include: {
        company: true,
        jobDegreeReq: true,
        jobSkillsReq: true,
        jobLicenseReq: true,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newJobPost);
    console.log(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body)
  }
});

router.get('/details', async (req, res) => {
  try {
      // Extract the query parameter 'ids' from the request
      const { id } = req.query;
      // console.log(id)
      // Query the database using Prisma to fetch job post by their IDs
      const jobDetails = await prisma.jobPost.findUnique({
          where: {
              id: id 
          },
          include:{
            company: true,
          }
      });
      // console.log(jobDetails)
      res.json(jobDetails);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/requirements/skills', async (req, res) => {
  try {
      const { id } = req.query;
      const skills = await prisma.jobSkillsReq.findMany({
          where: {
            jobPostId: id 
          },
          select: {
            skill: {
              select: {
                skillName: true
              }
            }
          }
      });
      const jobSkillsReq = skills.map(skill => skill.skill.skillName);
      // console.log(jobSkillsReq)
      res.json(jobSkillsReq);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/requirements/license', async (req, res) => {
  try {
      const { id } = req.query;
      const licenses = await prisma.jobLicenseReq.findMany({
          where: {
              jobPostId: id 
          },
          select: {
            license: {
              select: {
                licenseName: true
              }
            }
          }
      });
      const jobLicenseReq = licenses.map(license => license.license.licenseName);
      // console.log(jobLicenseReq)
      res.json(jobLicenseReq);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/requirements/degree', async (req, res) => {
  try {
      const { id } = req.query;
      const degrees = await prisma.jobDegreeReq
      .findMany({
        where: {
          jobPostId: id // Replace YOUR_JOB_POST_ID with the actual job post ID
        },
        select: {
          degree: {
            select: {
              degreeName: true
            }
          }
        }
      });

    const degreeNames = degrees.map(degree => degree.degree.degreeName);
    res.json(degreeNames);
    // console.log(degreeNames);
  } catch (error) {
      // If there's an error, send an error response
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
