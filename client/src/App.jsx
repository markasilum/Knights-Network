import { createContext, useEffect, useState } from 'react'
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
import CreateJobPost from './pages/JobPosts/CreateJobPost';
import CredentialsForm from './pages/Create-Credentials/CredentialsForm';
import ExperienceForm from './pages/Create-Credentials/ExperienceForm';
import LicenseForm from './pages/Create-Credentials/LicenseForm';
import SkillsForm from './pages/Create-Credentials/SkillsForm';
import CertificationsForm from './pages/Create-Credentials/CertificationsForm';
import ProfilePage from './pages/Profile/ProfilePage';
import JobPostsDashboard from './pages/JobPosts/JobPostsDashboard';
import JobPostDetails from './pages/JobPosts/JobPostDetails';
import Homepage from './pages/Homepage/Homepage';
import ApplicationDashboard from './pages/Applications-Dashboard/ApplicationDashboard';
import ResumeCard from './components/ResumeCard';
import EventsDashboard from './pages/Events/EventsDashboard';
import CreateEvent from './pages/Events/CreateEvent';
import EventDetail from './pages/Events/EventDetail';
import EditEducation from './pages/Edit-Credentials/EditEducation';
import SelectEditEduc from './pages/Edit-Credentials/SelectEditEduc';
import SelectEditExperience from './pages/Edit-Credentials/SelectEditExperience';
import SelectEditLicense from './pages/Edit-Credentials/SelectEditLicense';
import SelectEditSkills from './pages/Edit-Credentials/SelectEditSkills';
import SelectEditCerts from './pages/Edit-Credentials/SelectEditCerts';
import EventsAll from './pages/Events/EventsAll';
import EventEdit from './pages/Events/EventEdit';
import VerifyUsers from './pages/Verify-Users/VerifyUsers';
import VerifyAlumni from './pages/Verify-Users/VerifyAlumni';
import VerifyStudents from './pages/Verify-Users/VerifyStudents';
import VerifyCompanies from './pages/Verify-Users/VerifyCompanies';
import JobPostApplicants from './pages/JobPosts/JobPostApplicants';
import ResumeView from './components/ResumeView';
import EventPartners from './pages/Events/EventPartners';
import PersonUserSetting from './pages/Profile/PersonUserSetting';
import CalendarPage from './pages/Events/CalendarPage';
import ChooseUserType from './pages/Login/ChooseUserType';

function App() {

  return (
    <div className='className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	'>
      <Router>
          <Routes>
            <Route index element={<ProfilePage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/settings" element={<PersonUserSetting/>}/>
            <Route path="/register" element={<ChooseUserType/>}/>
            <Route path="/home" element={<Homepage/>}/>
            <Route path="/applications" element={<ApplicationDashboard/>}/>
            <Route path="/register/person" element={<CreateAccount/>}/>
            <Route path="/editaccount" element={<EditAccount/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register/company" element={<CreateCompany/>}/>
            <Route path="/editcompprofile" element={<EditCompanyProfile/>}/>
            <Route path="/createjobpost" element={<CreateJobPost/>}/>
            <Route path="/credentials" element={<CredentialsForm/>}/>
            <Route path="/expform" element={<ExperienceForm/>}/>
            <Route path="/licenseform" element={<LicenseForm/>}/>
            <Route path="/skillsform" element={<SkillsForm/>}/>
            <Route path="/certificationform" element={<CertificationsForm/>}/>
            <Route path='/jobpost/dashboard' element={<JobPostsDashboard/>}/>
            <Route path='/resume' element={<ResumeCard/>}/>
            <Route path='/jobpostdetails/:jobPostId' element={<JobPostDetails/>}/>
            <Route path='/eventdetails/:eventId' element={<EventDetail/>}/>
            <Route path='/eventslist' element={<EventsDashboard/>}/>
            <Route path='/createevent' element={<CreateEvent/>}/>
            <Route path='/edit-education' element={<EditEducation/>}/>
            <Route path='/education-edit' element={<SelectEditEduc/>}/>
            <Route path='/experience-edit' element={<SelectEditExperience/>}/>
            <Route path='/license-edit' element={<SelectEditLicense/>}/>
            <Route path='/skills-edit' element={<SelectEditSkills/>}/>
            <Route path='/certifications-edit' element={<SelectEditCerts/>}/>
            <Route path='/events' element={<EventsAll/>}/>
            <Route path='/events/calendar' element={<CalendarPage/>}/>
            <Route path='/event-edit' element={<EventEdit/>}/>
            <Route path='/event/partners/:eventId' element={<EventPartners/>}/>
            <Route path='/verify-users/alumni' element={<VerifyAlumni/>}/>
            <Route path='/verify-users/students' element={<VerifyStudents/>}/>
            <Route path='/verify-users/companies' element={<VerifyCompanies/>}/>
            <Route path='/jobpost/applicants/:jobPostId' element={<JobPostApplicants/>}/>
            <Route path='/jobpost/applicants/resume/:personId' element={<ResumeView/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
