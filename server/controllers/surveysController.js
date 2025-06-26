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
    const index = await prisma.survey.findMany({});

    res.status(200).json(index);
  } catch (error) {}
};

const getSurveyDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const details = await prisma.survey.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: true,
      },
    });

    res.status(200).json(details);
  } catch (error) {}
};

const getSurveyAnswers = async (req, res) => {
    try {
      const { id } = req.query;
      const details = await prisma.survey.findUnique({
        where: {
          id: id,
        },
        include: {
          questions: {
            include:{
                answers:{
                    include:{
                        company: true
                    }
                }
            }
          }
        },
      });
  
      res.status(200).json(details);
    } catch (error) {}
  };

const answerSurvey = async (req, res) => {
  try {
    const  {answers}  = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ error: "Invalid data format or empty array" });
      }

      const parsedAnswers = answers.map(answer => ({
        ...answer,
        answerValue: parseInt(answer.answerValue)
      }));
  
  
      const createdAnswers = await prisma.surveyAnswers.createMany({
        data: parsedAnswers,
      });
  
      res.status(200).json({ message: "Survey answers successfully saved" });
  } catch (error) {
    console.log(error)
  }
};

const createSurvey = async (req, res) => {
  try {
    const name = req.body.name;
    const questions = JSON.parse(req.body.questions);

    const survey = await prisma.survey.create({
      data: {
        name,
        questions: {
          create: questions.map((question) => ({
            questionText: question.question,
          })),
        },
      },
    });

    res.status(200).json(survey);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createSurvey,
  getSurveyIndex,
  getSurveyDetails,
  answerSurvey,
  getSurveyAnswers
};
