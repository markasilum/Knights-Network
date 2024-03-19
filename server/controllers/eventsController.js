const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getEventsList = async (req, res) => {};
const createEvent = async (req, res) => {
  try {
    const { eventName, eventLocation, eventDesc, eventDateTime } = req.body;
    const eventPhoto = req.file.filename

    const newEvent = await prisma.events.create({
      data: {
        eventName,
        eventPhoto,
        eventLocation,
        eventDesc,
        eventDateTime,
      },
    });

    // Send a response with the newly created person
    res.status(201).json(newEvent);
    // console.log(newEducation);
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(req.body)
  }
};

module.exports = {
  getEventsList,
  createEvent,
};
