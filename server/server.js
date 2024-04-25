const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser')

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
const authRoutes = require('./routes/authRoutes')
var cookies = require("cookie-parser");
const {requireAuth} = require('./middleware/authMiddleware')


const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:5173', // Replace yourPort with the actual port number of your client application
  credentials: true // Allow credentials
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())  
app.use(cookies())  

// app.use(express.urlencoded({extended: false}))

//user routes
app.use('/auth',authRoutes)
app.use('/user', requireAuth,userRoutes)
app.use('/person', requireAuth,personRoutes)
app.use('/company',requireAuth, companyRoutes)
app.use('/education', educationRoutes)
app.use('/degree', degreeRoutes)
app.use('/experience', experienceRoutes)
app.use('/jobpost',requireAuth, jobPostRoutes)
app.use('/application', applicationRoutes)
app.use('/license',licenseRoutes)
app.use('/skills', skillsRoutes)
app.use('/certification',certificationRoutes)
app.use('/events', requireAuth, eventsRoutes)

app.use('/uploads', express.static('uploads'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

