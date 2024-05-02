const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const getRecommendation = async (req, res) => {
  try {
    const { id } = req.query;
    const jobPost = await prisma.jobPost.findUnique({
      where: {
        id: id,
      },
      include: {
        jobDegreeReq: {
          include: {
            degree: true,
          },
        },
        jobSkillsReq: {
          include: {
            skill: true,
          },
        },
        jobLicenseReq: {
          include: {
            license: true,
          },
        },
      },
    });

    //MATCH DEGREE NAMES
    //remove BS, Bachelor of Science etc
    function removeBS(originalString) {
      // Create a regular expression to match any of the specified phrases globally and case insensitive
      const regex = /\b(?:BS|Bachelor of Science|BA|Bachelor of Arts)\b/gi;
      // Replace all occurrences of the specified phrases with an empty string
      let modifiedString = originalString.replace(regex, "");
      modifiedString = modifiedString.trim();
      return modifiedString;
    }

    //get degreename
    const degreeNames = jobPost.jobDegreeReq.map(
      (item) => item.degree.degreeName
    );
    //remove BS
    const filterDegName = degreeNames.map((item) => removeBS(item));

    //query with degreeName
    const personWithDegree = await prisma.degree.findMany({
      where: {
        OR: filterDegName.map((item) => ({
          degreeName: {
            contains: item,
          },
        })),
      },
      select: {
        education: {
          select: {
            person: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });
    //create na array of strings containing the userId of users who match the degreeNames
    const matchDegreeArray = personWithDegree
      .map((item) =>
        item.education.length > 0 ? item.education[0].person.userId : null
      )
      .filter((userId) => userId !== null);

      const phrases = [
        "Strong", "verbal", "and", "written", "communication", "skills",
        "Proficient", "interpersonal", "abilities",
        "Demonstrated", "capacity", "for", "effective", "teamwork",
        "Aptitude", "for", "collaborative", "problem-solving",
        "Ability", "to", "liaise", "effectively", "across", "departments",
        "Skilled", "in", "fostering", "positive", "working", "relationships",
        "Strong", "collaborator", "with", "a", "team-oriented", "approach",
        "Effective", "communicator", "with", "diverse", "audiences",
        "Demonstrated", "capacity", "for", "clear", "and", "concise", "communication",
        "Proven", "ability", "to", "work", "autonomously", "and", "in", "a", "team", "setting",
        "for", "in", "with", "on", "at", "by", "of", "to", "from", "through", "and", "skills", "skill", 
        "a", "proficient", "about", "abilities", "convey", "detail-oriented", "including", "collaboration", 
        "team", "excellent", "communication", "interpersonal", "independent", "such", "as", "part", "ability", 
        "proficiency", "work", "independently"
    ];

      function removePrepositions(originalString) {
        // Create a regular expression to match common prepositions globally and case insensitive
        const regex = new RegExp('\\b(?:' + phrases.join('|') + ')\\b', 'gi');
        // Replace all occurrences of the specified filter words with an empty string
        let modifiedString = originalString.replace(regex, "").replace(/\s{2,}/g, " ").trim();
        return modifiedString;
      }
    const skillNames = jobPost.jobSkillsReq.map((item) => item.skill.skillName);

    const filteredSkillName = skillNames.map((item) =>
      removePrepositions(item)
    );

    let wordsArray = [];

    // Iterate through each phrase
    filteredSkillName.forEach((phrase) => {
      // Split the phrase into words using whitespace as the delimiter
      // Add each word to the wordsArray'
      if(phrase!=""){
        const words = phrase.split(/\s+/);
        wordsArray = wordsArray.concat(words);
      }
    });

    const personWithSkill = await prisma.skills.findMany({
      where: {
        OR: wordsArray.map((item) => ({
          skillName: {
            contains: item,
          },
        })),
      },
      include: {
        personSkill: {
          select: {
            person: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });
    //userId array
    const matchedSkillsArray = personWithSkill
      .map((item) =>
        item.personSkill.length > 0 ? item.personSkill[0].person.userId : null
      )
      .filter((userId) => userId !== null);

    const licenseNames = jobPost.jobLicenseReq.map(
      (item) => item.license.licenseName
    );

    const personWithLicense = await prisma.pRCLicenses.findMany({
      where: {
        OR: licenseNames.map((item) => ({
          licenseName: {
            contains: item,
          },
        })),
      },
      include: {
        personLicense: {
          select: {
            person: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });
    const matchedLicenseArray = personWithLicense
      .map((item) =>
        item.personLicense.length > 0
          ? item.personLicense[0].person.userId
          : null
      )
      .filter((userId) => userId !== null);

    //match job title to experience and details
    const jobTitle = jobPost.jobTitle;

    function removeExperienceTerms(originalString) {
      // Define an array of terms and their abbreviations used to indicate different levels of experience
      const experienceTerms = [
        "entry-level",
        "entry",
        "junior",
        "jr\\.?",
        "mid-level",
        "mid",
        "senior",
        "sr\\.?",
        "experienced",
        "exp\\.?",
        "advanced",
        "adv\\.?",
        "expert",
        "expt\\.?",
      ];
      // Create a regular expression to match the specified terms globally and case insensitive, and dots before any word boundary
      const regex = new RegExp(
        "\\b(?:" + experienceTerms.join("|") + ")\\b|\\.(?=\\s*\\b)",
        "gi"
      );
      // Replace all occurrences of the specified terms with an empty string
      let modifiedString = originalString.replace(regex, "");
      modifiedString = modifiedString.trim();
      return modifiedString;
    }
    const filteredJobTitle = removeExperienceTerms(jobTitle);
    const personWithJobTitle = await prisma.experience.findMany({
      where: {
          jobTitle: {
            contains: filteredJobTitle,
          },
      },
      select: {
        person: {
          select: {
            userId: true,
          },
        },
      },
    });

    const matchedJobTitleArray = personWithJobTitle.map(item => item.person.userId).filter(userId => userId !== null);

    const finalSetUserIdArray = [
      ...new Set([
        ...matchDegreeArray,
        ...matchedSkillsArray,
        ...matchedLicenseArray,
        ...matchedJobTitleArray
      ]),
    ];

    const userDetails = await prisma.user.findMany({
        where: {
            id: {
              in: finalSetUserIdArray
            },
        },
        select: {
          person: true
        },
      });


    res.json(userDetails);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  getRecommendation,
};
