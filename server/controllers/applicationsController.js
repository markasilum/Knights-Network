const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer  = require('multer');
const prisma = new PrismaClient();


const jwt = require("jsonwebtoken");

const getUserIdFromJWT = (req) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");

  return decodedToken.id;
};

const apply = async (req, res) => {
  const userIdCookie = getUserIdFromJWT(req)

    try {
      const { id } = req.body;
      // Create a new person record in the database using Prisma
      const newApplication = await prisma.application.create({ 
        data:{
          person:{
            connect:{
                userId: userIdCookie
            }
          },
          jobPost:{
            connect:{
              id: id
            }
          },
          status:"pending"
        },
        include: {
          person: true,
          jobPost: true,
        },
      });
      console.log(id)
  
      res.status(201).json(newApplication);
      
    } catch (error) {
      console.error('Error creating person:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      // console.log(req.body)
    }
  }

  const getListOfApplications = async (req, res) => {
    const userIdCookie = getUserIdFromJWT(req)

    try{    
      const {id} = req.query
      const data = await prisma.application.findMany({
        where:{
          person:{
            userId: userIdCookie
          }
        },  
        orderBy:[
          {
            dateCreated: 'desc'
          }
        ],
        include:{
          jobPost:{
            include: {
              company: true
            }
          },
        }
      });
      res.json(data);
      
    }catch(error){
      console.error('Error getting application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
  
    }
  }

  const checkIfApplied = async (req, res) => {
    const userIdCookie = getUserIdFromJWT(req)

    try{    
      const {id} = req.query
      const data = await prisma.application.findMany({
        where:{
          jobPostId: id,
          person:{
            userId: userIdCookie
          }
        }
      });
      let exist = false;
      
      data.map((job)=>{
        if(job.jobPostId != null){
          exist = true
        }
      })
      res.json(exist);
      
    }catch(error){
      console.error('Error getting application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      // console.log(req.body)
  
    }
  }

  const setStatus = async (req, res) => {
    console.log(req.body)
    try{    
      const {id, status} = req.body
      const data = await prisma.application.update({
        where:{
          id: id,
        },data:{
          status: status
        }
      });
      
      res.status(201).json(data);
    }catch(error){
      console.error('Error getting application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(req.body)
  
    }
  }
module.exports ={
  apply,
  getListOfApplications,
  checkIfApplied,
  setStatus
}