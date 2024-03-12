const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer  = require('multer');
const prisma = new PrismaClient();


let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";

let userId = personUserId;

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003";
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

const getCompanyDetails = async (req, res) => {
    const data = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
  
    res.json(data);
  }

  const createCompany = async (req, res) => {
    const {
      companyName,
      companySize,
      username,
      password,
      streetAddress,
      cityName,
      countryName,
      zipCode,
      contactNum,
      emailAddress,
      biography,
    } = req.body;
    await prisma.user.create({
      data: {
        username,
        password,
        streetAddress,
        cityName,
        countryName,
        zipCode,
        contactNum,
        emailAddress,
        biography,
        verified: false,
        role: {
          create: {
            roleName: "company",
          },
        },
        company: {
          create: {
            companyName,
            companySize,
            // Add more fields if needed
          },
        },
      },
    });
  }

  const updateCompany = async (req, res) => {
    //to do: include id in the request body
    try {
      // Extract data from the request body
      const {
        companyName,
        companySize,
        username,
        password,
        streetAddress,
        cityName,
        countryName,
        zipCode,
        contactNum,
        emailAddress,
        biography,
      } = req.body;
      // Construct the full street address
  
      const updateUser = await prisma.user.update({
        where: {
          id: companyUserId,
        },
        data: {
          username,
          password,
          streetAddress,
          cityName,
          zipCode,
          countryName,
          emailAddress,
          contactNum,
          biography,
          company: {
            update: {
              where: {
                id: companyId,
              },
              data: {
                companyName,
                companySize,
              },
            },
          },
        },
        include: {
          company: true,
        },
      });
  
      // Send a response with the newly created person
      res.status(201).json(updateUser);
    } catch (error) {
      console.error("Error creating person:", error);
      res.status(500).json({ error: "Internal Server Error" });
      console.log(req.body);
    }
  }
module.exports = {
 getCompanyDetails,
 createCompany,
 updateCompany
}