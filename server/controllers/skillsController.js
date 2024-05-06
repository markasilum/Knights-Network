const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};


const getPersonSkills = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)
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
  const userIdCookie = getUserIdFromJWT(req)

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
  const deleteSkill = async (req, res) => {
    try {
      const {id} = req.query
      const data = await prisma.personSkill.delete({
        where:{
          id: id
        }
      })
  
      res.status(200).json("deleted license")
    } catch (error) {
      console.error("error deleting license", error)
    }
  }
module.exports = {
    createPersonSkill,
    getPersonSkills,
    updatePersonSkill,
    deleteSkill
}