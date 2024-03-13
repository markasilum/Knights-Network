import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
const LicenseCard = () => {
  const[licenses, setLicense] = useState([])

useEffect(()=>{
    const fetchExperience = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/license/person/index`);
        const getUserResult = await response.json();
        setLicense(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchExperience()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>License</span>
            <div className='flex gap-3'>
            <Link to="/licenseform" className='font-thin underline'>Add</Link> 
            <Link to="/licenseform" className='font-thin underline'>Edit</Link>
            </div>
        </div>

        {/* {licenses.map((license)=>(
          <div key={license.id} className='flex flex-col mb-5'>
              
              <p className='font-thin'><DateToWords dateString={license.licenseValidity} /></p>
        
              </div>
             
        ))} */}
        <span className='font-normal'>{licenses}</span>
        {console.log(licenses)}
      </div>
  )
}

export default LicenseCard