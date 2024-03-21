import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import Layout from './layouts/Layout.jsx';

import Homepage from './pages/Homepage/Homepage.jsx';

import CreateAccount from "./pages/Create-Account/CreateAccount";
import EditAccount from "./pages/Edit-Account/EditAccount";
import LoginScreen from "./pages/Login/LoginScreen";
import CreateCompany from "./pages/Create-Account/CreateCompany";
import EditCompanyProfile from "./pages/Edit-Account/EditCompanyProfile";
import CreateJobPost from "./pages/Create-Job-Post/CreateJobPost";
import CredentialsForm from "./pages/Create-Credentials/CredentialsForm";
import ExperienceForm from "./components/ExperienceForm";
import LicenseForm from "./components/LicenseForm";
import SkillsForm from "./components/SkillsForm";
import CertificationsForm from "./components/CertificationsForm";
import JobPostsDashboard from "./pages/Company-JobPost-Dashboard/JobPostsDashboard";
import JobPostDetails from "./pages/JobPostDetails/JobPostDetails";
import ApplicationDashboard from "./pages/Applications-Dashboard/ApplicationDashboard";
import ResumeCard from "./components/resumeCard";
import EventsDashboard from "./pages/Events/EventsDashboard";
import CreateEvent from "./pages/Events/CreateEvent";
import EventDetail from "./pages/Events/EventDetail";
import Layout2 from './layouts/Layout2.jsx';
import Layout3 from './layouts/Layout3.jsx';




//alumni
const ProfileComponent = Layout(ProfilePage, role);
const HomePageComponent = Layout(Homepage)
const JobPostsDashboardComponent = Layout(JobPostsDashboard);
const JobPostDetailsComponent = Layout(JobPostDetails);
const ApplicationDashboardComponent = Layout(ApplicationDashboard);
const ResumeCardComponent = Layout(ResumeCard);
const EventsDashboardComponent = Layout(EventsDashboard);
const EventDetailComponent = Layout(EventDetail);


const CreateAccountComponent = Layout2(CreateAccount);
const EditAccountComponent = Layout2(EditAccount);
const CreateCompanyComponent = Layout2(CreateCompany);
const EditCompanyProfileComponent = Layout2(EditCompanyProfile);
const CreateJobPostComponent = Layout2(CreateJobPost);
const CredentialsFormComponent = Layout2(CredentialsForm);
const ExperienceFormComponent = Layout2(ExperienceForm);
const LicenseFormComponent = Layout2(LicenseForm);
const SkillsFormComponent = Layout2(SkillsForm);
const CertificationsFormComponent = Layout2(CertificationsForm);
const CreateEventComponent = Layout2(CreateEvent);

const LoginScreenComponent = Layout3(LoginScreen);


const router = createBrowserRouter(
  [
    { path: '/', element: <ProfileComponent />},
    { path: '/profile', element: <ProfileComponent />},
    { path: '/home', element: <HomePageComponent />},
    { path: '/create-account', element: <CreateAccountComponent />},
    { path: '/edit-account', element: <EditAccountComponent />},
    { path: '/login', element: <LoginScreenComponent />},
    { path: '/create-company', element: <CreateCompanyComponent />},
    { path: '/edit-company-profile', element: <EditCompanyProfileComponent />},
    { path: '/create-job-post', element: <CreateJobPostComponent />},
    { path: '/credentials-form', element: <CredentialsFormComponent />},
    { path: '/experience-form', element: <ExperienceFormComponent />},
    { path: '/license-form', element: <LicenseFormComponent />},
    { path: '/skills-form', element: <SkillsFormComponent />},
    { path: '/certifications-form', element: <CertificationsFormComponent />},
    { path: '/job-posts-dashboard', element: <JobPostsDashboardComponent />},
    { path: '/job-post-details/:jobPostId', element: <JobPostDetailsComponent />},
    { path: '/application-dashboard', element: <ApplicationDashboardComponent />},
    { path: '/resume-card', element: <ResumeCardComponent />},
    { path: '/events-dashboard', element: <EventsDashboardComponent />},
    { path: '/create-event', element: <CreateEventComponent />},
    { path: '/event-detail', element: <EventDetailComponent />},

  ],
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
