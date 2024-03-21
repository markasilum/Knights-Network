import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PersonAbout from "../../components/PersonAbout";
import PersonCredentials from "../../components/PersonCredentials";
import CompanyJobs from "../../components/CompanyJobs";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
 const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [educData, setEducData] = useState([]);
  const [data, setData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [compJobPostData, setCompJobPostData] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [profileNavButton, setProfileNavButton] = useState("about");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/role");
        const getUserResult = await response.json();
        setUserRole(getUserResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/details");
        const getUserResult = await response.json();
        setUserData(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPersonData = async () => {
      try {
        const response = await fetch("http://localhost:3000/person/details");
        const getPersonResult = await response.json();
        setData(getPersonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("http://localhost:3000/company/details");
        const getPersonResult = await response.json();
        setCompData(getPersonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchEducation = async () => {
      try {
        const response = await fetch("http://localhost:3000/education/index");
        const getEducRes = await response.json();
        setEducData(getEducRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCompanyJobPost = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobpost/company/index");
        const getJobRes = await response.json();
        setCompJobPostData(getJobRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserRole();
    fetchUserData();
    fetchPersonData();
    fetchEducation();
    fetchCompanyData();
    fetchCompanyJobPost()
 }, []);


  return (
      <div className="pt-5 pr-5 pl-3 overflow-auto">
        <div className="w-full bg-white h-fit min-h-80 p-5 grid grid-cols-2 rounded-xl mb-2">
          <div className="flex flex-col col-span-1">

            <div className="avatar">
              <div className="w-24 rounded">
                <img src={`http://localhost:3000/uploads/profPic/${userData.profPic}`} />
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
          </div>

          <div className="flex flex-col col-span-1 items-end">
            {userRole.roleName == "alumni"&&(
                  <Link className="underline" to="/edit-account">Edit Profile</Link>
            )}{userRole.roleName == "company"&&(
              <Link className="underline" to="/edit-company-profile">Edit Profile</Link>
            )}
            <span>Temp: {data.id}</span>
          </div>

          <div className="mt-5 border-t-2 border-solid border-neutral pt-2 flex flex-row gap-5 col-span-2">
            <button
              className="font-bold"
              onClick={() => setProfileNavButton("about")}
            >
              About
            </button>
            {userRole.roleName ==="company" &&
                <button className="font-bold" onClick={() => setProfileNavButton("jobs")}>Jobs</button>
            }{userRole.roleName ==="student"||userRole.roleName ==="alumni"  &&
            <button className="font-bold" onClick={() => setProfileNavButton("creds")}>Credentials</button>
            }
            <button
              className="font-bold"
              onClick={() => setProfileNavButton("contact")}
            >
              Contact
            </button>
          </div>
        </div>

        {/* create a components */}

        {profileNavButton==="about" && 
          <PersonAbout userData={userData}/>
        }
   
        {profileNavButton==="creds" &&
         <PersonCredentials educData={educData}/>
        }
        {profileNavButton==="jobs" &&
        <CompanyJobs jobData={compJobPostData} companyData={compData} />
        }

        {profileNavButton==="contact" &&
          <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
          <p className='text-justify'>Email: {userData.emailAddress}</p>
          <p className='text-justify'>Phone: {userData.contactNum}</p>
        </div>  
        }
      </div>
   );
 };

export default ProfilePage;
