const express = require('express');
const multer  = require('multer');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes')
const personRoutes = require('./routes/personRoutes')
const companyRoutes = require('./routes/companyRoutes')
const educationRoutes = require('./routes/educationRoutes')
const jobPostRoutes = require('./routes/jobPostRoutes')
const degreeRoutes = require('./routes/degreeRoutes')
const experienceRoutes = require('./routes/experienceRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const licenseRoutes = require('./routes/licenseRoutes')
const skillsRoutes = require('./routes/skillsRoutes')
const certificationRoutes = require('./routes/certificationsRoute')
const eventsRoutes = require('./routes/eventsRoutes')

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())  
// app.use(express.urlencoded({extended: false}))
const upload = multer();

let personUserId = "2e3d06a3-fcdd-45a8-a4d3-2d6cfaad96be"
let companyUserId = "9113d0aa-0d6a-4df3-b663-d72f3b9d7774"

let userId = companyUserId

let personId = "9689255f-6e15-4073-8c68-5d39ad8f9003"
let companyId = "7c2b0ac0-a50b-4ff5-9b0c-b7c13d45a4fe"

//user routes
app.use('/user',userRoutes)
app.use('/person',personRoutes)
app.use('/company',companyRoutes)
app.use('/education', educationRoutes)
app.use('/degree', degreeRoutes)
app.use('/experience', experienceRoutes)
app.use('/jobpost', jobPostRoutes)
app.use('/application', applicationRoutes)
app.use('/license',licenseRoutes)
app.use('/skills', skillsRoutes)
app.use('/certification',certificationRoutes)
app.use('/events', eventsRoutes)

app.use('/uploads', express.static('uploads'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

