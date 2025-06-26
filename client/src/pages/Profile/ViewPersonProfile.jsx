import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import PersonAbout from "../../components/PersonAbout";
import PersonCredentials from "../../components/PersonCredentials";
import CompanyJobs from "../../components/CompanyJobs";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useAuthContext } from "../../hooks/useAuthContext";
import ContactPage from "./ContactPage";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ViewCredentials from "./ViewCredentials";
import ButtonNavigator from "../../components/ButtonNavigator";
const ViewPersonProfile = () => {
  const { personId } = useParams();
  const [userData, setUserData] = useState("");
  const [profileNavButton, setProfileNavButton] = useState("about");
  const [personPref, setPersonPref] = useState("");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/person/credentials?id=${personId}`,
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

  useEffect(()=>{
    if(userData){
      const getPersonPreferences = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/person/preferences?id=${userData.user.id}`,{
              credentials:'include'
            }
          );
          const getCredReq = await response.json();
          setPersonPref(getCredReq);
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      };
      getPersonPreferences()
    }

},[userData])

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-2 pr-2 overflow-scroll">
            {userData && (
              <div className="w-full bg-white h-fit min-h-80 p-5 grid grid-cols-2 rounded-xl mb-2">
                <div className="flex flex-col col-span-1">
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img
                        src={`http://localhost:3000/uploads/profPic/${userData.user.profPic}`}
                      />
                    </div>
                  </div>

                  <h1 className="font-bold text-2xl mt-5">
                    {userData.firstName +
                      " " +
                      userData.middleName +
                      " " +
                      userData.lastName +
                      " " +
                      userData.suffix}
                  </h1>

                  <p>{userData.user.streetAddress + ","}</p>
                  <p>{userData.user.cityName + ","}</p>
                  <p>{userData.user.countryName}</p>

                  <p className="mt-2">
                    <LocalPhoneOutlinedIcon fontSize="small" />{" "}
                    {userData.user.contactNum}
                  </p>
                  <p>
                    <EmailOutlinedIcon fontSize="small" />{" "}
                    {userData.user.emailAddress}
                  </p>

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
                    className={`font-semibold active:text-info ${
                      profileNavButton === "creds"
                        ? "text-accent underline"
                        : ""
                    }`}
                    onClick={() => setProfileNavButton("creds")}
                  >
                    Credentials
                  </button>
                  </div>
                </div>
                
              </div>
              
            )}

            {userData&&(
              profileNavButton === "about" && (
              <PersonAbout userData={userData.user} />
            )
            )}

          {userData&&(
            profileNavButton === "creds" && (
              <ViewCredentials userId={userData.user.id} preferences={personPref} personId={personId} experience={userData.experience} skills={userData.skills} educData={userData.education} licenses={userData.personLicense} certs={userData.certification}/>
            )
          )}  

               
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPersonProfile;
