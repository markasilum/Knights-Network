import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PersonAbout from "../../components/PersonAbout";
import PersonCredentials from "../../components/PersonCredentials";
import CompanyJobs from "../../components/CompanyJobs";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useAuthContext } from "../../hooks/useAuthContext";
import ContactPage from "./ContactPage";
 const ProfilePage = () => {
  const {user} = useAuthContext()
  const [userData, setUserData] = useState(user.user);
  const [educData, setEducData] = useState([]);
  const [data, setData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [compJobPostData, setCompJobPostData] = useState([]);
  const [userRole, setUserRole] = useState(user.user.role);
  const [profileNavButton, setProfileNavButton] = useState("about");

  const fetchEducation = async () => {
    try {
      const response = await fetch("http://localhost:3000/education/index",{
        credentials:'include'
      });
      const getEducRes = await response.json();
      setEducData(getEducRes);
      // console.log(getEducRes)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await fetch("http://localhost:3000/person/details",{
          credentials:'include'
        });
        const getPersonResult = await response.json();
        setData(getPersonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("http://localhost:3000/company/details",{
          credentials:'include'
        });
        const getPersonResult = await response.json();
        setCompData(getPersonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

   

    const fetchCompanyJobPost = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobpost/company/index",{
          credentials:'include'
        });
        const getJobRes = await response.json();
        setCompJobPostData(getJobRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if(userRole.roleName == 'alumni' || userRole.roleName == 'student'){
      fetchPersonData();
        fetchEducation();
    }else if(userRole.roleName == 'company'){
      fetchCompanyData();
      fetchCompanyJobPost()
    }
    
 }, []);


  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />

        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-2 pr-2 overflow-scroll">
            <div className="w-full bg-white h-fit min-h-80 p-5 grid grid-cols-2 rounded-xl mb-2">
              <div className="flex flex-col col-span-1">
                <div className="avatar">
                  <div className="w-24 rounded">
                    <img
                      src={`http://localhost:3000/uploads/profPic/${userData.profPic}`}
                    />
                  </div>
                </div>

                {userRole.roleName === "company" && (
                  <h1 className="font-bold text-2xl mt-5">
                    {compData.companyName}
                  </h1>
                )}
                {userRole.roleName === "alumni" && (
                  <h1 className="font-bold text-2xl mt-5">
                    {data.firstName +
                      " " +
                      data.middleName +
                      " " +
                      data.lastName +
                      " " +
                      data.suffix}
                  </h1>
                )}
                {userRole.roleName === "student" && (
                  <h1 className="font-bold text-2xl mt-5">
                    {data.firstName +
                      " " +
                      data.middleName +
                      " " +
                      data.lastName +
                      " " +
                      data.suffix}
                  </h1>
                )}
                <p>{userData.streetAddress + ","}</p>
                <p>{userData.cityName + ","}</p>
                <p>{userData.countryName}</p>

                <p>{userData.contactNum}</p>
                <p>{userData.emailAddress}</p>
              </div>
              <div className="flex flex-col col-span-1 items-end">
                {userRole.roleName == "alumni" && (
                  <Link className="underline" to="/editaccount">
                    Edit Profile
                  </Link>
                )}
                {userRole.roleName == "student" && (
                  <Link className="underline" to="/editaccount">
                    Edit Profile
                  </Link>
                )}
                {userRole.roleName == "company" && (
                  <Link className="underline" to="/editcompprofile">
                    Edit Profile
                  </Link>
                )}
              </div>

              <div className="mt-5 border-t-2 border-solid border-neutral pt-2 flex flex-row gap-5 col-span-2">
                <button
                  className={`font-semibold active:text-info ${profileNavButton === 'about' ? 'text-accent underline'  : ''}`}
                  onClick={() => setProfileNavButton("about")}
                >
                  About
                </button>
                {userRole.roleName === "company" && (
                  <button
                  className={`font-semibold active:text-info ${profileNavButton === 'jobs' ? 'text-accent underline'  : ''}`}
                    onClick={() => setProfileNavButton("jobs")}
                  >
                    Jobs
                  </button>
                )}
                {userRole.roleName === "student" ||
                  (userRole.roleName === "alumni" && (
                    <button
                    className={`font-semibold active:text-info ${profileNavButton === 'creds' ? 'text-accent underline'  : ''}`}
                    onClick={() => setProfileNavButton("creds")}
                    >
                      Credentials
                    </button>
                  ))}
                  {userRole.roleName === "company" && (
                  <button
                  className={`font-semibold active:text-info ${profileNavButton === 'contact' ? 'text-accent underline'  : ''}`}
                  onClick={() => setProfileNavButton("contact")}
                >
                  Contact
                </button>
                )}
                
              </div>
            </div>

            {/* create a components */}

            {profileNavButton === "about" && (
              <PersonAbout userData={userData} />
            )}

            {profileNavButton === "creds" && (
              <PersonCredentials educData={educData} fetchEducation={fetchEducation}/>
            )}
            {profileNavButton === "jobs" && (
              <CompanyJobs jobData={compJobPostData} companyData={compData} />
            )}

            {profileNavButton === "contact" && <ContactPage />}
          </div>
        </div>
      </div>
    </div>
  );
 };

export default ProfilePage;
