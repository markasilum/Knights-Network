import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import PersonAbout from './PersonAbout';
import PersonCredentials from './PersonCredentials';
const HomePage = () => {
  
const [userData, setUserData] = useState([]);
const [educData, setEducData] = useState([]);
const [data, setData] = useState([]);
const [compData, setCompData] = useState([]);
const [userRole, setUserRole] = useState('')


useEffect(() => {

    const fetchUserRole = async() =>{
      try {
        const response = await fetch('http://localhost:3000/api/getuserrole');
        const getUserResult = await response.json();
        setUserRole(getUserResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      console.log(userRole.roleName)
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getuser');
        const getUserResult = await response.json();
        setUserData(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchPersonData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const getPersonResult = await response.json();
        setData(getPersonResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getcompany');
        const getPersonResult = await response.json();
        setCompData(getPersonResult);
    const fetchEducation = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/geteduc');
        const getEducRes = await response.json();
        setEducData(getEducRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserRole();
    fetchCompanyData()
    fetchEducation();
    fetchUserData();
    fetchPersonData();


  }, []);

  const [profileNavButton, setProfileNavButton] = useState("about");

  return (
    
    <div className='flex flex-col w-9/12  h-screen  bg-neutral '>
      <div className='pt-5 pr-5 pl-3 overflow-auto'>

        <div className='overflow-hidden w-full bg-white h-fit min-h-80 p-5 grid grid-cols-2 rounded-xl mb-2'>

          <div className='flex flex-col col-span-1'>
                <div className="w-28 h-28 bg-black rounded-lg">
                  
                </div>
                {userRole.roleName === "company"&&
                    <h1 className='font-bold text-2xl mt-5'>{compData.companyName}</h1>
                }{userRole.roleName === "alumni" || userRole.roleName === "student"&&
                  <h1 className='font-bold text-2xl mt-5'>{data.firstName+" "+data.middleName+" "+data.lastName +" "+data.suffix}</h1>
                 }
                <p>{userData.streetAddress+","}</p>
                <p>{userData.cityName+","}</p>
                <p>{userData.countryName}</p>

                <p>{userData.contactNum}</p>
          </div>

          <div className='flex flex-col col-span-1 items-end'>
            <a href='' className='underline'></a>
            <Link className='underline' to="/editcompprofile">Edit Profile</Link>
            <span>Temp: {compData.id}</span>
          </div>

          <div className='mt-5 border-t-2 border-solid border-neutral pt-2 flex flex-row gap-5 col-span-2'>
              <button className='font-bold' onClick={()=>setProfileNavButton("about")}>About</button>
              <button className='font-bold'onClick={()=>setProfileNavButton("jobs")}>Jobs</button>
              <button className='font-bold'onClick={()=>setProfileNavButton("contact")}>Contact</button>
          </div>            
        </div>

        {/* create a components */}
        {
          (()=> {
            if(userRole.roleName == "company"){
              {profileNavButton==="about" && 
                <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
                  <p className='text-justify'>{userData.biography}</p>
                </div>  
              }
              {profileNavButton==="jobs" &&
                <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
                <p className='text-justify'>Posted Jobs</p>
              </div>  
              }
              {profileNavButton==="contact" &&
                <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
                <p className='text-justify'>Email: {userData.emailAddress}</p>
                <p className='text-justify'>Phone: {userData.contactNum}</p>
              </div>  
            }
            }else if(userRole.roleName ==="alumni" || userRole.roleName ==="students"){
                    {
                      profileNavButton === "about" && (
                        <PersonAbout userData={userData} />
                      );
                    }
                    {
                      profileNavButton === "creds" && (
                        <PersonCredentials educData={educData} />
                      );
                    }
                    {profileNavButton==="contact" &&
                        <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
                        <p className='text-justify'>Email: {userData.emailAddress}</p>
                        <p className='text-justify'>Phone: {userData.contactNum}</p>
                      </div>  
                    }

            }

          }

          )
        
        {profileNavButton==="about" && 
          <PersonAbout userData={userData}/>
        }
        {profileNavButton==="creds" &&
         <PersonCredentials educData={educData}/>
        }
        
        

       
        
      </div>
    </div>
  )
}

export default HomePage