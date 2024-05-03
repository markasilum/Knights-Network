import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import LicenseForm from '../pages/Create-Credentials/LicenseForm';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const LicenseCard = () => {
  const[licenses, setLicense] = useState([])
  const fetchLicense = async () =>{
    try {
      const response = await fetch(`http://localhost:3000/license/person/index`,{
        credentials:'include'
      });
      const getUserResult = await response.json();
      setLicense(getUserResult);
      // console.log(getUserResult)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

useEffect(()=>{

    fetchLicense()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>License</span>
            <div className='flex gap-3'>
            <button className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-success' onClick={()=>document.getElementById('add_license').showModal()}><AddOutlinedIcon/></button>
            {/* {console.log(licenses)} */}
            <Link to="/license-edit" className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-accent' state={{licenses}}><EditOutlinedIcon/></Link>
            </div>
        </div>
        <LicenseForm fetchLicense={fetchLicense}/>
        <ul className='font-normal list-disc ml-5'>
        {licenses.map((license)=>(
         
             <li key={license.id}>{license.licenseName}</li>
         
        ))}
        </ul>
        {/* {console.log(licenses)} */}
      </div>
  )
}

export default LicenseCard