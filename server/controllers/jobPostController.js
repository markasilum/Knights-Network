const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

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
  const userIdCookie = getUserIdFromJWT(req)

  try {
    const data = await prisma.jobPost.findMany({
      where: {
        company:{
          userId:userIdCookie
        }
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
  const userIdCookie = getUserIdFromJWT(req)

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
    let salaryWithoutCommas = salary.replace(/[, ]/g, '');
    const parsedSalary = parseInt(salaryWithoutCommas );
    const parsedPos = parseInt(numOfPosition);

    validity = (validity === 'null') ? null : validity;

    if (isNaN(parsedPos)) {
      throw new Error("Number of positions is not a valid number");
    }
    if (isNaN(parsedSalary)) {
      throw new Error("Salary is not a valid number");
    }



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
            userId: userIdCookie,
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
    res.status(500).json({ error: error.message });
    // console.log(req.body)
  }
};

const updateJobPost = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

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
      appLettrBool = true;
    }

    validity = (validity === 'null') ? null : validity;
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
            userId: userIdCookie
          },
        },
      }})


    const jobDegreeReqIds= await prisma.jobDegreeReq.findMany({
      where:{
        jobPostId:id
      },
      include:{
        degree:true
      }
    })

    if(degree){
      const degreeNamesArray = degree.map(degree => degree.degreeName);
    if (degreeNamesArray.length > jobDegreeReqIds.length) {
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
      // console.log("removed items");

      let removedItem = jobDegreeReqIds.filter(req => !degreeNamesArray.includes(req.degree.degreeName))
      let removedItemName = removedItem.map(req => req.degree.degreeName);
      // console.log(removedItemName)
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
      // console.log("number of items the same");
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
    }else{
      await prisma.jobDegreeReq.deleteMany({
        where:{
          jobPostId:id
        },
      })
    }

    

    //SKILLS UPDATE
    //get skillName from skillObject

    if(skill){
      const skillNamesArray = skill.map(skill => skill.skillName);
      const jobSkillsReq= await prisma.jobSkillsReq.findMany({
      where:{
        jobPostId:id
      },
      include:{
        skill:true
      }
    })
    if(skillNamesArray.length > jobSkillsReq.length){
      //added new skills
      for (const item of skillNamesArray) {
        if (!jobSkillsReq.some((req) => req.skill.skillName === item)) {
          // Item not found in jobDegreeReqIds, return it or perform any desired action
          await prisma.jobSkillsReq.create({
            data: {
              jobPost: {
                connect: {
                  id: id,
                },
              },
              skill: {
                connectOrCreate: {
                  create: {
                    skillName: item,
                  },
                  where: {
                    skillName: item,
                  },
                },
              },
            },
          });
        }

        for (const [index, jobSkillsReqItem] of jobSkillsReq.entries()) {
          // Get the degreeName from the provided array
          const skillNameValue = skillNamesArray[index];
          // console.log(jobDegreeReq.id)

          await prisma.jobSkillsReq.update({
            where: {
              id: jobSkillsReqItem.id,
            },
            data: {
              skill: {
                connectOrCreate: {
                  where: {
                    skillName: skillNameValue,
                  },
                  create: {
                    skillName: skillNameValue,
                  },
                },
              },
            },
            include: {
              skill: true,
            },
          });
        }
      }
    }else if(skillNamesArray.length < jobSkillsReq.length){
      //deleted some skills

      let removedItem = jobSkillsReq.filter(req => !skillNamesArray.includes(req.skill.skillName))
      let removedItemName = removedItem.map(req => req.skill.skillName);
      // console.log(removedItemName)
      await prisma.jobSkillsReq.deleteMany({
        where: {
          skill:{
            skillName: {
              in: removedItemName
            }
          }
        },
      })

      for (const item of skillNamesArray) {
        if (!jobSkillsReq.some((req) => req.skill.skillName === item)) {
          // Item not found in jobDegreeReqIds, return it or perform any desired action
          await prisma.jobSkillsReq.create({
            data: {
              jobPost: {
                connect: {
                  id: id,
                },
              },
              skill: {
                connectOrCreate: {
                  create: {
                    skillName: item,
                  },
                  where: {
                    skillName: item,
                  },
                },
              },
            },
          });
        }
      }

    }else{
      //update the skills. no add no delete
      for (const [index, jobSkillsReqItem] of jobSkillsReq.entries()) {
        // Get the degreeName from the provided array
        const skillNameValue = skillNamesArray[index];
        // console.log(jobDegreeReq.id)

        await prisma.jobSkillsReq.update({
          where: {
            id: jobSkillsReqItem.id,
          },
          data: {
            skill: {
              connectOrCreate: {
                where: {
                  skillName: skillNameValue,
                },
                create: {
                  skillName: skillNameValue,
                },
              },
            },
          },
          include: {
            skill: true,
          },
        });
      }
    }
    }else{
      await prisma.jobSkillsReq.deleteMany({
        where:{
          jobPostId:id
        },
      })
    }
    

    

    //LICENSE UPDATE
    // console.log(license)
    const jobLicenseReq= await prisma.jobLicenseReq.findMany({
      where:{
        jobPostId:id
      },
      include:{
        license:true
      }
    })
   
    if(license){
            const licenseNamesArray = license.map(license => license.licenseName)
          if(licenseNamesArray.length > jobLicenseReq.length){
            //added skill
            for (const item of licenseNamesArray) {
              if (!jobLicenseReq.some((req) => req.license.licenseName === item)) {
                // Item not found in jobDegreeReqIds, return it or perform any desired action
                await prisma.jobLicenseReq.create({
                  data: {
                    jobPost: {
                      connect: {
                        id: id,
                      },
                    },
                    license: {
                      connectOrCreate: {
                        create: {
                          licenseName: item,
                        },
                        where: {
                          licenseName: item,
                        },
                      },
                    },
                  },
                });
              }
      
              for (const [index, jobLicenseReqItem] of jobLicenseReq.entries()) {
                // Get the degreeName from the provided array
                const licenseNameValue = licenseNamesArray[index];
                // console.log(jobDegreeReq.id)
      
                await prisma.jobLicenseReq.update({
                  where: {
                    id: jobLicenseReqItem.id,
                  },
                  data: {
                    license: {
                      connectOrCreate: {
                        where: {
                          licenseName: licenseNameValue,
                        },
                        create: {
                          licenseName: licenseNameValue,
                        },
                      },
                    },
                  },
                  include: {
                    license: true,
                  },
                });
              }
            }
      
          }else if(licenseNamesArray.length < jobLicenseReq.length){
            //deleted skill
            let removedItem = jobLicenseReq.filter(req => !licenseNamesArray.includes(req.license.licenseName))
            let removedItemName = removedItem.map(req => req.license.licenseName);
            // console.log(removedItemName)
            await prisma.jobLicenseReq.deleteMany({
              where: {
                license:{
                  licenseName: {
                    in: removedItemName
                  }
                }
              },
            })
      
            for (const item of licenseNamesArray) {
              if (!jobLicenseReq.some((req) => req.license.licenseName === item)) {
                // Item not found in jobDegreeReqIds, return it or perform any desired action
                await prisma.jobLicenseReq.create({
                  data: {
                    jobPost: {
                      connect: {
                        id: id,
                      },
                    },
                    license: {
                      connectOrCreate: {
                        create: {
                          licenseName: item,
                        },
                        where: {
                          licenseName: item,
                        },
                      },
                    },
                  },
                });
              }
            }
      
          }else{
            //updated skill
            for (const [index, jobLicenseReqItem] of jobLicenseReq.entries()) {
              // Get the degreeName from the provided array
              const licenseNameValue = licenseNamesArray[index];
              // console.log(jobDegreeReq.id)
      
              await prisma.jobLicenseReq.update({
                where: {
                  id: jobLicenseReqItem.id,
                },
                data: {
                  license: {
                    connectOrCreate: {
                      where: {
                        licenseName: licenseNameValue,
                      },
                      create: {
                        licenseName: licenseNameValue,
                      },
                    },
                  },
                },
                include: {
                  license: true,
                },
              });
            }
          }
        }
        else{
          await prisma.jobLicenseReq.deleteMany({
            where:{
              jobPostId:id
            },
          })
      } 

    res.status(200).json("jobpost updated")
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

const getJobsMany = async (req, res) => {
  try {
    // Extract the query parameter 'ids' from the request
    const idArr  = req.body;
    // Query the database using Prisma to fetch job post by their IDs
    const jobDetails = await prisma.jobPost.findMany({
      where: {
        id:{
          in: idArr
        }
      },
      include:{
        company: true
      }
    });
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
        applicationLetter:true
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

const autoCloseJobPost = async () => {
  try {
      const currentDate = new Date().toISOString();
      
      // Find all job posts with a validity date equal to the current date
      const jobPostsToUpdate = await prisma.jobPost.findMany({
          where: {
              validity: {
                  lte: currentDate // Get only the date part
              }
          }
      });

      // Update the isOpen status of job posts
      for (const jobPost of jobPostsToUpdate) {
          await prisma.jobPost.update({
              where: { id: jobPost.id },
              data: { isOpen: false } // Set isOpen to true for job posts with matching validity date
          });
      }

      console.log(currentDate);
  } catch (error) {
      console.error('Error updating job post statuses:', error.message);
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
  getJobsMany,
  autoCloseJobPost,
};
