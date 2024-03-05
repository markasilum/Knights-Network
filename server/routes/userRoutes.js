const { PrismaClient } = require("@prisma/client");

const express = require("express");
const router = express.Router();
const prisma = new PrismaClient();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

router.get("/role", async (req, res) => {
  const data = await prisma.roles.findUnique({
    where: {
      userId: userId,
    },
  });
  res.json(data);
});

router.get("/details", async (req, res) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  res.json(data);
});

module.exports = router;
