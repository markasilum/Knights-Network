import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import CertificationsForm from '../pages/Create-Credentials/CertificationsForm';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const CertificationsCard = () => {
  const[certs, setCerts] = useState([])
  const fetchCerts = async () =>{
    try {
      const response = await fetch(`http://localhost:3000/certification/person/index`,{
        credentials:'include'
      });
      const getUserResult = await response.json();
      setCerts(getUserResult);
      // console.log(getUserResult)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

useEffect(()=>{

    fetchCerts()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Certifications</span>
            <div className='flex gap-3'>
            <button className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-success' onClick={()=>document.getElementById('add_cert').showModal()}><AddOutlinedIcon fontSize='medium'/></button>
            <Link to="/certifications-edit" className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-accent'><EditOutlinedIcon fontSize='medium'/></Link>
            </div>
           
        </div>
        <CertificationsForm fetchCerts={fetchCerts}/>

        {/* <span className='font-normal'>{certs.join(', ')}</span> */}
        <ul className='font-normal list-disc ml-5'>
        {
          certs.map((cert)=>(
            <li key={cert.id}>{cert.certName}</li>
          ))
        }
        </ul>

      </div>
  )
}

export default CertificationsCard