import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CreateAccount from './pages/Create-Account/CreateAccount';
import EditAccount from './pages/Edit-Account/EditAccount';
import LoginScreen from './pages/Login/LoginScreen';
import CreateCompany from './pages/Create-Account/CreateCompany';
import EditCompanyProfile from './pages/Edit-Account/EditCompanyProfile';
import CreateJobPost from './pages/Create-Job-Post/CreateJobPost';
import CredentialsForm from './pages/Create-Credentials/CredentialsForm';
import ExperienceForm from './components/ExperienceForm';
import LicenseForm from './components/LicenseForm';
import SkillsForm from './components/SkillsForm';
import CertificationsForm from './components/CertificationsForm';
import ProfilePage from './pages/Profile/ProfilePage';
import JobPostsDashboard from './pages/Company-JobPost-Dashboard/JobPostsDashboard';
import JobPostDetails from './pages/JobPostDetails/JobPostDetails';
import Homepage from './pages/Homepage/Homepage';
import ApplicationDashboard from './pages/Applications-Dashboard/ApplicationDashboard';


function App() {

  return (
    <div className='className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	'>
      <Router>
          <Routes>
            <Route index element={<ProfilePage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/home" element={<Homepage/>}/>
            <Route path="/applications" element={<ApplicationDashboard/>}/>
            <Route path="/createaccount" element={<CreateAccount/>}/>
            <Route path="/editaccount" element={<EditAccount/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/createcompany" element={<CreateCompany/>}/>
            <Route path="/editcompprofile" element={<EditCompanyProfile/>}/>
            <Route path="/createjobpost" element={<CreateJobPost/>}/>
            <Route path="/credentials" element={<CredentialsForm/>}/>
            <Route path="/expform" element={<ExperienceForm/>}/>
            <Route path="/licenseform" element={<LicenseForm/>}/>
            <Route path="/skillsform" element={<SkillsForm/>}/>
            <Route path="/certificationform" element={<CertificationsForm/>}/>
            <Route path='/jobpostdashboard' element={<JobPostsDashboard/>}/>
            <Route path='/jobpostdetails/:jobPostId' element={<JobPostDetails/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
