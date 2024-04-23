const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};
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

const updateEvent = async (req, res) => {
  try {
    const { eventId, eventName, eventLocation, eventDesc, eventDateTime } = req.body;
    let eventPhoto

    if(req.file != null){
        eventPhoto = req.file.filename
    }

    const newEvent = await prisma.events.update({
      where:{
        id: eventId,
      },
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
    console.error("Error updating event:", error);
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
        console.log(eventDetails)
        res.json(eventDetails);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }

  const joinEvent = async (req, res) => {
    const userIdCookie = getUserIdFromJWT(req)

    try {
        const { id } = req.body;

        const join = await prisma.companyEvents.create({
          data:{
            status: "pending",
            company:{
              connect:{
                userId: userIdCookie
              },
            },
            event:{
              connect:{
                id: id
              }
            }
          }
        })
        res.status(201).json(join);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }

  const checkIfJoined = async (req, res) => {
    const userIdCookie = getUserIdFromJWT(req)

    try{    
      const {id} = req.query
      const data = await prisma.companyEvents.findMany({
        where:{
          eventId: id,
          company:{
            userId: userIdCookie
          }
        }
      });

      console.log(data)
      
      res.json(data);
      
    }catch(error){
      console.error('Error getting application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
    }
  }

  const getPartners = async (req, res) => {
    try{    
      const {id} = req.query
      const data = await prisma.events.findUnique({
        where:{
          id: id,
        },
        include:{
          companyEvents:{
            include:{
              company: true
            }
          }
        }
      });

      console.log(data)
      
      res.json(data);
      
    }catch(error){
      console.error('Error getting event partners:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
    }
  }

  const setStatus = async (req, res) => {
    console.log(req.body)
    try{    
      const {id, status} = req.body
      const data = await prisma.companyEvents.update({
        where:{
          id: id,
        },data:{
          status: status
        }
      });
      
      res.status(201).json(data);
    }catch(error){
      console.error('Error setting company event status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
  
    }
  }

module.exports = {
  getEventsList,
  createEvent,
  getEventDetails,
  updateEvent,
  joinEvent,
  checkIfJoined,
  getPartners,
  setStatus
};
