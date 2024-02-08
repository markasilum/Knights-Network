import { useState } from 'react'
import './App.css'
import Mainpage from './components/Mainpage'
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


function App() {

  return (
    <div className='className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	'>
      <Router>
          <Routes>
            <Route index element={<Mainpage/>}/>
            <Route path='/home' element={<Mainpage/>}/>
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
          </Routes>
      </Router>
    </div>
  )
}

export default App
