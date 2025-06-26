//import {Express, Request, Response} from 'express'
// import swaggerJsdoc from 'swagger-jsdoc'
const swaggerUi = require('swagger-ui-express')
// import { version } from '../package.json'
const express = require('express');

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Knights Network API Docs",
      version: "2.0.0",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security:[
        {
            bearerAuth:[],
        }
    ]
  },
  apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

function swaggerDocs(app, port){
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

    app.get("docs.json", (req,res)=>{
        res.setHeader("Content-Type","application/json")
        res.send(openapiSpecification)
    })

    console.log("Docs Available")
}

module.exports = swaggerDocs;