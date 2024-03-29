import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import LicenseForm from './LicenseForm';
const LicenseCard = () => {
  const[licenses, setLicense] = useState([])

useEffect(()=>{
    const fetchLicense = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/license/person/index`);
        const getUserResult = await response.json();
        setLicense(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchLicense()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>License</span>
            <div className='flex gap-3'>
            <button className='font-thin underline' onClick={()=>document.getElementById('add_license').showModal()}>Add</button>
            <Link to="/licenseform" className='font-thin underline'>Edit</Link>
            </div>
        </div>
        <LicenseForm/>

        <span className='font-normal'>{licenses.join(", ")}</span>
        {console.log(licenses)}
      </div>
  )
}

export default LicenseCard