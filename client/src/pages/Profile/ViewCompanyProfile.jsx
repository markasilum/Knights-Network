import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PersonAbout from "../../components/PersonAbout";
import PersonCredentials from "../../components/PersonCredentials";
import CompanyJobs from "../../components/CompanyJobs";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useAuthContext } from "../../hooks/useAuthContext";
import ContactPage from "./ContactPage";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
const ViewCompanyProfile = () => {
  const { companyId } = useParams();
  const [userData, setUserData] = useState("");
  const [profileNavButton, setProfileNavButton] = useState("about");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/company/profile/view?id=${companyId}`,
          {
            credentials: "include",
          }
        );
        const getRes = await response.json();

        setUserData(getRes);
      } catch (error) {}
    };

    fetchCompanyData();
  }, []);

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          {userData && (
            <div className="pt-2 pr-2 overflow-scroll">
              <div className="w-full bg-white h-fit min-h-80 p-5 grid grid-cols-2 rounded-xl mb-2">
                <div className="flex flex-col col-span-1">
                  <div className="w-24 rounded">
                    <img
                      src={`http://localhost:3000/uploads/profPic/${userData.user.profPic}`}
                    />
                  </div>
                  <h1 className="font-bold text-2xl mt-5">
                    {userData.companyName}
                  </h1>

                  <p>{userData.user.cityName + ","}</p>
                  <p>{userData.user.countryName}</p>

                  <p>{userData.user.contactNum}</p>
                  <p>{userData.user.emailAddress}</p>
                </div>

                <div className="mt-5 border-t-2 border-solid border-neutral pt-2 flex flex-row gap-5 col-span-2">
                  <button
                    className={`font-semibold active:text-info ${
                      profileNavButton === "about"
                        ? "text-accent underline"
                        : ""
                    }`}
                    onClick={() => setProfileNavButton("about")}
                  >
                    About
                  </button>
                  <button
                    className={`font-semibold active:text-info  ${
                      profileNavButton === "jobs" ? "text-accent underline" : ""
                    }`}
                    onClick={() => setProfileNavButton("jobs")}
                  >
                    Jobs
                  </button>
                  <button
                    className={`font-semibold active:text-info ${
                      profileNavButton === "contact"
                        ? "text-accent underline"
                        : ""
                    }`}
                    onClick={() => setProfileNavButton("contact")}
                  >
                    Contact
                  </button>
                </div>
              </div>
              {profileNavButton === "about" && (
                <PersonAbout userData={userData.user} />
              )}
              {profileNavButton === "jobs" && (
                <div className="overflow-auto-y w-full  bg-white h-fit mt-3 p-5 flex flex-col rounded-xl mb-20 gap-2">
                  {userData.jobPost.map((job) => (
                    
                      <div key={job.id} >
                        <Link to={`/jobpostdetails/${job.id}`} className="bg-neutral h-fit w-full rounded-lg flex flex-col p-3 hover:bg-info active:bg-neutral">
                        <span className="font-semibold">{job.jobTitle}</span>
                        <span className="font-normal">
                          {userData.companyName}
                        </span>
                        <span className="font-thin">{job.jobLoc}</span>
                        </Link>
                      </div>
                   
                  ))}
                </div>
              )}
                
              {profileNavButton === "contact" &&(
                <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
                  {userData.contactPerson.map((item)=>(
                    <div key={item.id}>
                        <h1 className='text-justify font-semibold'>{item.positionName}</h1>
                          <p className='flex gap-2 items-center'><BadgeOutlinedIcon fontSize='small'/>{item.person.firstName} {item.person.middleName} {item.person.lastName}</p>
                          <p className='flex gap-2 items-center'><EmailOutlinedIcon fontSize='small'/>{item.email}</p>
                          <p className='flex gap-2 items-center'><LocalPhoneOutlinedIcon fontSize='small'/>{item.phone}</p>
                      </div>        
                  ))}
              </div>  
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCompanyProfile;
