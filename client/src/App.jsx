import { createContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import CreateAccount from "./pages/Create-Account/CreateAccount";
import EditAccount from "./pages/Edit-Account/EditAccount";
import LoginScreen from "./pages/Login/LoginScreen";
import CreateCompany from "./pages/Create-Account/CreateCompany";
import EditCompanyProfile from "./pages/Edit-Account/EditCompanyProfile";
import CreateJobPost from "./pages/JobPosts/CreateJobPost";
import CredentialsForm from "./pages/Create-Credentials/CredentialsForm";
import ExperienceForm from "./pages/Create-Credentials/ExperienceForm";
import LicenseForm from "./pages/Create-Credentials/LicenseForm";
import SkillsForm from "./pages/Create-Credentials/SkillsForm";
import CertificationsForm from "./pages/Create-Credentials/CertificationsForm";
import ProfilePage from "./pages/Profile/ProfilePage";
import JobPostsDashboard from "./pages/JobPosts/JobPostsDashboard";
import JobPostDetails from "./pages/JobPosts/JobPostDetails";
import Homepage from "./pages/Homepage/Homepage";
import ApplicationDashboard from "./pages/Applications-Dashboard/ApplicationDashboard";
import ResumeCard from "./components/ResumeCard";
import EventsDashboard from "./pages/Events/EventsDashboard";
import CreateEvent from "./pages/Events/CreateEvent";
import EventDetail from "./pages/Events/EventDetail";
import EditEducation from "./pages/Edit-Credentials/EditEducation";
import SelectEditEduc from "./pages/Edit-Credentials/SelectEditEduc";
import SelectEditExperience from "./pages/Edit-Credentials/SelectEditExperience";
import SelectEditLicense from "./pages/Edit-Credentials/SelectEditLicense";
import SelectEditSkills from "./pages/Edit-Credentials/SelectEditSkills";
import SelectEditCerts from "./pages/Edit-Credentials/SelectEditCerts";
import EventsAll from "./pages/Events/EventsAll";
import EventEdit from "./pages/Events/EventEdit";
import VerifyUsers from "./pages/Verify-Users/VerifyUsers";
import VerifyAlumni from "./pages/Verify-Users/VerifyAlumni";
import VerifyStudents from "./pages/Verify-Users/VerifyStudents";
import VerifyCompanies from "./pages/Verify-Users/VerifyCompanies";
import JobPostApplicants from "./pages/JobPosts/JobPostApplicants";
import ResumeView from "./components/ResumeView";
import EventPartners from "./pages/Events/EventPartners";
import PersonUserSetting from "./pages/Profile/PersonUserSetting";
import CalendarPage from "./pages/Events/CalendarPage";
import ChooseUserType from "./pages/Login/ChooseUserType";
import { useAuthContext } from "./hooks/useAuthContext";
import ViewCompanyProfile from "./pages/Profile/ViewCompanyProfile";
import JobPostView from "./pages/JobPosts/JobPostView";
import SearchResultPage from "./components/SearchResultPage";
import SearchPageCompany from "./components/SearchPageCompany";
import SearchPagePeople from "./components/SearchPagePeople";
import ViewPersonProfile from "./pages/Profile/ViewPersonProfile";
import ResumeViewProfile from "./components/ResumeViewProfile";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	">
      <Router>
        <Routes>
          {/* no login required */}
          <Route
            path="/register"
            element={<ChooseUserType /> }
          />
          <Route
            path="/register/person"
            element={<CreateAccount />}
          />
          <Route
            path="/register/company"
            element={<CreateCompany />}
          />
          {/* admin page */}
          <Route
            path="/eventslist"
            element={user && user.user.role.roleName == 'admin' ? <EventsDashboard /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/event/partners/:eventId"
            element={user && user.user.role.roleName == 'admin' ? <EventPartners /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/verify-users/alumni"
            element={user && user.user.role.roleName == 'admin'  ? <VerifyAlumni /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/verify-users/students"
            element={user && user.user.role.roleName == 'admin'  ? <VerifyStudents /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/verify-users/companies"
            element={user && user.user.role.roleName == 'admin' ? <VerifyCompanies /> : <Navigate to={"/login"} />}
          />


          <Route index element={user ? <ProfilePage /> : <LoginScreen />} />

          <Route
            path="/search/jobpost"
            element={user ? <SearchResultPage/> : <Navigate to={"/login"} />}
          />
          <Route
            path="/search/companies"
            element={user ? <SearchPageCompany/> : <Navigate to={"/login"} />}
          />
          <Route
            path="/search/people"
            element={user ? <SearchPagePeople/> : <Navigate to={"/login"} />}
          />

          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/profile/view/:companyId"
            element={user ? <ViewCompanyProfile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/profile/person/view/:personId"
            element={user ? <ViewPersonProfile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/settings"
            element={user ? <PersonUserSetting /> : <Navigate to={"/login"} />}
          />
         
          <Route
            path="/home"
            element={user ? <Homepage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/applications"
            element={
              user ? <ApplicationDashboard /> : <Navigate to={"/login"} />
            }
          />
          
          <Route
            path="/editaccount"
            element={user ? <EditAccount /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!user ? <LoginScreen /> : <Navigate to={"/profile"} />}
          />
          
          <Route
            path="/editcompprofile"
            element={user ? <EditCompanyProfile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/createjobpost"
            element={user ? <CreateJobPost /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/credentials"
            element={user ? <CredentialsForm /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/expform"
            element={user ? <ExperienceForm /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/licenseform"
            element={user ? <LicenseForm /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/skillsform"
            element={user ? <SkillsForm /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/certificationform"
            element={user ? <CertificationsForm /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/jobpost/dashboard"
            element={user ? <JobPostsDashboard /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/resume"
            element={user ? <ResumeCard /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/jobpostdetails/:jobPostId"
            element={user ? <JobPostDetails /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/jobpost/view/:jobPostId"
            element={user ? <JobPostView /> : <Navigate to={"/login"} />}
          />

          <Route
            path="/eventdetails/:eventId"
            element={user ? <EventDetail /> : <Navigate to={"/login"} />}
          />
          
          <Route
            path="/createevent"
            element={user ? <CreateEvent /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/edit-education"
            element={user ? <EditEducation /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/education-edit"
            element={user ? <SelectEditEduc /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/experience-edit"
            element={
              user ? <SelectEditExperience /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/license-edit"
            element={user ? <SelectEditLicense /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/skills-edit"
            element={user ? <SelectEditSkills /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/certifications-edit"
            element={user ? <SelectEditCerts /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/events"
            element={user ? <EventsAll /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/events/calendar"
            element={user ? <CalendarPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/event-edit"
            element={user ? <EventEdit /> : <Navigate to={"/login"} />}
          />
          
          
          <Route
            path="/jobpost/applicants/:jobPostId"
            element={user ? <JobPostApplicants /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/jobpost/applicants/resume/:personId"
            element={user ? <ResumeView /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/person/resume/view/:personId"
            element={user ? <ResumeViewProfile /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
