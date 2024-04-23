const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userIdCookie = personUserId

const getPersonSkills = async (req, res) => {
    try {
      const skills = await prisma.personSkill.findMany({
        where: {
          person:{
            userId: userIdCookie
          }
        },select: {
          id: true,
            skill: {
              select: {
                skillName: true
              }
            }
          }
      });
      const personSkills = skills.map(skill=>({
        id: skill.id,
        skillName: skill.skill.skillName
      }));
      res.json(personSkills);
    } catch (error) {
      console.error("Error getting license:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
const createPersonSkill = async (req, res) => {
    try {
      // Extract data from the request body
      const { skillName } = req.body;
      console.log(skillName)

      const newSkill = await prisma.personSkill.create({
        data: {
          person: {
            connect: {
              userId: userIdCookie,
            },
          },
          skill: {
            connectOrCreate: {
              where: {
                skillName: skillName,
              },
              create: {
                skillName: skillName,
              },
            },
          },
        },
        include: {
          person: true,
          skill: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newSkill);
    } catch (error) {
      console.error("Error creating license:", error);
      res.status(500).json({ error: "Internal Server Error" });
      // console.log(req.body)
    }
  };

  const updatePersonSkill = async (req, res) => {
    try {
      // Extract data from the request body
      const { personSkillId, skillName } = req.body;

      const newSkill = await prisma.personSkill.update({
        where:{
          id: personSkillId,
        },
        data: {
          skill: {
            connectOrCreate: {
              where: {
                skillName: skillName,
              },
              create: {
                skillName: skillName,
              },
            },
          },
        },
        include: {
          skill: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(newSkill);
    } catch (error) {
      console.error("Error updating license:", error);
      res.status(500).json({ error: "Internal Server Error" });
      // console.log(req.body)
    }
  };

module.exports = {
    createPersonSkill,
    getPersonSkills,
    updatePersonSkill,
}