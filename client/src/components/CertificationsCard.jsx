import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
const CertificationsCard = () => {
  const[certs, setCerts] = useState([])

useEffect(()=>{
    const fetchCerts = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/certification/person/index`);
        const getUserResult = await response.json();
        setCerts(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCerts()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Certifications</span>
            <div className='flex gap-3'>
            <Link to="/certificationform" className='font-thin underline'>Add</Link> 
            <Link to="/certificationform" className='font-thin underline'>Edit</Link>
            </div>
           
        </div>

        <span className='font-normal'>{certs.join(', ')}</span>

      </div>
  )
}

export default CertificationsCard