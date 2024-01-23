const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors())

app.get('/api/data', async (req, res) => {
    const data = await prisma.person.findMany();
    res.json(data);
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

