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
module.exports = router;
