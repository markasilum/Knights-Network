import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
const HomePage = () => {
const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [profileNavButton, setProfileNavButton] = useState("about");

  return (
    
    <div className='flex flex-col w-9/12  h-screen  bg-neutral '>
      <div className='pt-5 pr-5 pl-3 overflow-auto'>

        <div className='overflow-hidden w-full bg-white h-80 p-5 grid grid-cols-2 shadow-md rounded-xl mb-2'>

          <div className='flex flex-col col-span-1'>
                <div className="w-28 ">
                  <img className='rounded-xl' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
                <h1 className='font-bold text-2xl mt-5'>{data.firstName+" "+data.middleName+" "+data.lastName +" "+data.suffix}</h1>
                <p>{data.streetAddress+","}</p>
                <p>{data.cityName+","}</p>
                <p>{data.countryName}</p>
          </div>

          <div className='flex flex-col col-span-1 items-end'>
            <a href='' className='underline'></a>
            <Link className='underline' to="/editaccount">Edit Profile</Link>
            <span>Temp: {data.id}</span>
          </div>

          <div className='mt-5 border-t-2 border-solid border-neutral pt-2 flex flex-row gap-5 col-span-2'>
              <button className='font-bold' onClick={()=>setProfileNavButton("about")}>About</button>
              <button className='font-bold'onClick={()=>setProfileNavButton("creds")}>Credentials</button>
              <button className='font-bold'onClick={()=>setProfileNavButton("contact")}>Contact</button>
          </div>


               

                  
        </div>

        {/* create a components */}

        {profileNavButton==="about" && 
          <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl shadow-md mb-5'>
            <p className='text-justify'>{data.biography}</p>
          </div>  
        }
        {profileNavButton==="creds" &&
          <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl shadow-md mb-5'>
          <p className='text-justify'>Credentials</p>
        </div>  
        }

        {profileNavButton==="contact" &&
          <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl shadow-md mb-5'>
          <p className='text-justify'>Email: {data.emailAddress}</p>
          <p className='text-justify'>Phone: {data.contactNum}</p>
        </div>  
        }
        
      </div>
    </div>
  )
}

export default HomePage