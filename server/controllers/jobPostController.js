const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

const jobPostIndex = async (req, res) => {
  try {
    const jobPosts = await prisma.jobPost.findMany({
      orderBy: [
        {
          dateUpdated: "desc",
        },
        {
          dateCreated: "desc",
        },
      ],
      include: {
        company: true,
        jobDegreeReq: {
          include: {
            degree: true,
          },
        },
      },
    });

    // console.log(jobPosts)
    res.json(jobPosts);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateJobPostStatus = async (req, res) => {
  try {
    let { id, isOpen } = req.body;

    let booleanValue;

    if (isOpen == "true") {
      booleanValue = true;
    } else if (isOpen == "false") {
      booleanValue = false;
    }

    // console.log(id, booleanValue);

    const data = await prisma.jobPost.update({
      where: {
        id: id,
      },
      data: {
        isOpen: booleanValue,
      },
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Error updating job post status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const companyJobPostIndex = async (req, res) => {
  try {
    const data = await prisma.jobPost.findMany({
      where: {
        companyId: companyId,
      },
      include: {
        application: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error("Error getting degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body);
  }
};

const createJobPost = async (req, res) => {
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
          create: degree.map((deg) => ({
            degree: {
              connectOrCreate: {
                create: {
                  degreeName: deg.degreeName,
                },
                where: {
                  degreeName: deg.degreeName,
                },
              },
            },
          })),
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
    // console.log(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body)
  }
};

const updateJobPost = async (req, res) => {
  try {
    // Extract data from the request body
    let {
      id,
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

    await prisma.jobPost.update({
      where:{
        id:id
      },
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
      }})

    const degreeNamesArray = degree.map(degree => degree.degreeName);

    const jobDegreeReqIds= await prisma.jobDegreeReq.findMany({
      where:{
        jobPostId:id
      },
      include:{
        degree:true
      }
    })

    if (degreeNamesArray.length > jobDegreeReqIds.length) {
      console.log("added new item");
      //if naa new item, create the item.
      //compare name sa new item sa names inside sa jobDegreeReq
      //ang name na wala match ang new added item

      for (const item of degreeNamesArray) {
        if (!jobDegreeReqIds.some((req) => req.degree.degreeName === item)) {
          // Item not found in jobDegreeReqIds, return it or perform any desired action
          await prisma.jobDegreeReq.create({
            data: {
              jobPost: {
                connect: {
                  id: id,
                },
              },
              degree: {
                connectOrCreate: {
                  create: {
                    degreeName: item,
                  },
                  where: {
                    degreeName: item,
                  },
                },
              },
            },
          });
        }

        for (const [index, jobDegreeReq] of jobDegreeReqIds.entries()) {
          // Get the degreeName from the provided array
          const degreeNameValue = degreeNamesArray[index];
          // console.log(jobDegreeReq.id)

          await prisma.jobDegreeReq.update({
            where: {
              id: jobDegreeReq.id,
            },
            data: {
              degree: {
                connectOrCreate: {
                  where: {
                    degreeName: degreeNameValue,
                  },
                  create: {
                    degreeName: degreeNameValue,
                  },
                },
              },
            },
            include: {
              degree: true,
            },
          });
        }
      }
    } else if (degreeNamesArray.length < jobDegreeReqIds.length) {
      console.log("removed items");

      let removedItem = jobDegreeReqIds.filter(req => !degreeNamesArray.includes(req.degree.degreeName))
      let removedItemName = removedItem.map(req => req.degree.degreeName);
      console.log(removedItemName)
      await prisma.jobDegreeReq.deleteMany({
        where: {
          degree:{
            degreeName: {
              in: removedItemName
            }
          }
        },
      })

      for (const item of degreeNamesArray) {
        if (!jobDegreeReqIds.some((req) => req.degree.degreeName === item)) {
          // Item not found in jobDegreeReqIds, return it or perform any desired action
          await prisma.jobDegreeReq.create({
            data: {
              jobPost: {
                connect: {
                  id: id,
                },
              },
              degree: {
                connectOrCreate: {
                  create: {
                    degreeName: item,
                  },
                  where: {
                    degreeName: item,
                  },
                },
              },
            },
          });
        }
      }

    } else {
      console.log("number of items the same");
      for (const [index, jobDegreeReq] of jobDegreeReqIds.entries()) {
        // Get the degreeName from the provided array
        const degreeNameValue = degreeNamesArray[index];
        // console.log(jobDegreeReq.id)

        await prisma.jobDegreeReq.update({
          where: {
            id: jobDegreeReq.id,
          },
          data: {
            degree: {
              connectOrCreate: {
                where: {
                  degreeName: degreeNameValue,
                },
                create: {
                  degreeName: degreeNameValue,
                },
              },
            },
          },
          include: {
            degree: true,
          },
        });
      }
    }

    //get skillName
    

  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ error: "Internal Server Error" });
    
  }
};
const getJobDetails = async (req, res) => {
  try {
    // Extract the query parameter 'ids' from the request
    const { id } = req.query;
    // console.log(id)
    // Query the database using Prisma to fetch job post by their IDs
    const jobDetails = await prisma.jobPost.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      },
    });
    // console.log(jobDetails)
    res.json(jobDetails);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getJobApplicants = async (req, res) => {
  try {
    // Extract the query parameter 'ids' from the request
    const { id } = req.query;
    // console.log(id)
    // Query the database using Prisma to fetch job post by their IDs
    const jobDetails = await prisma.jobPost.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
        application: {
          include: {
            person: true,
          },
        },
      },
    });
    // console.log(jobDetails)
    res.json(jobDetails);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const jobReqSkill = async (req, res) => {
  try {
    const { id } = req.query;
    const skills = await prisma.jobSkillsReq.findMany({
      where: {
        jobPostId: id,
      },
      select: {
        skill: {
          select: {
            skillName: true,
          },
        },
      },
    });
    const jobSkillsReq = skills.map((skill) => skill.skill.skillName);
    // console.log(jobSkillsReq)
    res.json(jobSkillsReq);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const jobReqLicense = async (req, res) => {
  try {
    const { id } = req.query;
    const licenses = await prisma.jobLicenseReq.findMany({
      where: {
        jobPostId: id,
      },
      select: {
        license: {
          select: {
            licenseName: true,
          },
        },
      },
    });
    const jobLicenseReq = licenses.map(
      (license) => license.license.licenseName
    );
    // console.log(jobLicenseReq)
    res.json(jobLicenseReq);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const jobReqDegree = async (req, res) => {
  try {
    const { id } = req.query;
    const degrees = await prisma.jobDegreeReq.findMany({
      where: {
        jobPostId: id, // Replace YOUR_JOB_POST_ID with the actual job post ID
      },
      include: {
        degree: true
      },
    });

    const degreeNames = degrees.map((degree) => degree.degree.degreeName);

    res.json(degreeNames);
    // console.log(degreeNames);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  jobPostIndex,
  companyJobPostIndex,
  createJobPost,
  getJobDetails,
  jobReqSkill,
  jobReqLicense,
  jobReqDegree,
  updateJobPostStatus,
  getJobApplicants,
  updateJobPost,
};
