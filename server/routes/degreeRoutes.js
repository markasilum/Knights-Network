const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer  = require('multer');
const router = express.Router();
const prisma = new PrismaClient();
const upload = multer();


let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

router.get('/index', async (req, res) => {
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
  });
module.exports = router