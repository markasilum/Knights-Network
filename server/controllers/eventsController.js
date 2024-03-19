const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getEventsList = async (req, res) => {
    try{
        const jobPosts = await prisma.events.findMany({
          orderBy:[
            {
              eventDateTime: 'desc'
            }
          ],
        })
        res.json(jobPosts);
      }catch(error){
        console.error('Error: ', error)
        res.status(500).json({ error: 'Internal server error' });
      }


};
const createEvent = async (req, res) => {
  try {
    const { eventName, eventLocation, eventDesc, eventDateTime } = req.body;
    let eventPhoto

    if(req.file != null){
        eventPhoto = req.file.filename
    }

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

const getEventDetails = async (req, res) => {
    try {
        // Extract the query parameter 'ids' from the request
        const { id } = req.query;
        console.log(req.query)
        // Query the database using Prisma to fetch job post by their IDs
        const eventDetails = await prisma.events.findUnique({
            where: {
                id: id 
            },
        });
        // console.log(jobDetails)
        res.json(eventDetails);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }


module.exports = {
  getEventsList,
  createEvent,
  getEventDetails
};
