const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const getSurveyIndex = async (req, res) => {
try {
    const index = await prisma.survey.findMany({})

    res.status(200).json(index)
} catch (error) {
    
}
}

const getSurveyDetails = async (req, res) => {
    try {
        const{id} = req.query
        const details = await prisma.survey.findUnique({
            where:{
                id:id
            },
            include:{
                questions:true
            }
        })
    
        res.status(200).json(details)
    } catch (error) {
        
    }
    }

const createSurvey = async (req, res) => {
try {
    const name = req.body.name;
    const questions = JSON.parse(req.body.questions);
    
    const survey = await prisma.survey.create({
        data:{
            name,
            questions:{
                create: questions.map((question)=>({
                    questionText: question.question
                }))
            }
        }
    })

    res.status(200).json(survey)
} catch (error) {
    console.log(error)
}
}

module.exports = {
    createSurvey,
    getSurveyIndex,
    getSurveyDetails
}
