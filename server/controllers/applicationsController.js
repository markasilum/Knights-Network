const { PrismaClient } = require("@prisma/client");

const express = require("express");
const multer  = require('multer');
const prisma = new PrismaClient();


let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be";
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774";
let personUserId2 = "bdb007b8-917f-4c93-ac85-2186970525d7"


let userId = personUserId;

let person2 = "cd8dbd9b-6ac3-4bbf-8d55-c4ceb339dac8"
let person1 = "9689255f-6e15-4073-8c68-5d39ad8f9003";

let personId = person2;
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe";

const apply = async (req, res) => {
    try {
      const { id } = req.body;
      // Create a new person record in the database using Prisma
      const newApplication = await prisma.application.create({ 
        data:{
          person:{
            connect:{
                id:personId,
            }
          },
          jobPost:{
            connect:{
              id: id
            }
          }
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
    try{    
      const {id} = req.query
      const data = await prisma.application.findMany({
        where:{
          personId: personId,
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
    try{    
      const {id} = req.query
      const data = await prisma.application.findMany({
        where:{
          jobPostId: id,
          personId: personId
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
      console.log(req.body)
  
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