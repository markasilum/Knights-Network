const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDegreeName = async (req, res) => {
    try {
        // Extract the query parameter 'ids' from the request
        const { ids } = req.query;
  
        if (!ids) {
            return res.status(400).json({ error: 'Ids parameter is required' });
        }
  
        // Split the 'ids' string into an array
        const degreeIds = ids.split(',');
        console.log(degreeIds)
        // Query the database using Prisma to fetch degrees by their IDs
        const degrees = await prisma.degree.findMany({
            where: {
                id: {
                    in: degreeIds // No need to parse IDs since they are strings
                }
            }
        });
        // Send the degrees as JSON response
        res.json(degrees);
        console.log(degrees)
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    getDegreeName
}