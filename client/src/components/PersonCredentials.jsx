import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import EducCard from './EducCard';
import ExperienceCards from './ExperienceCards';

const PersonCredentials = ({educData}) => {
  
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit mt-3 p-5 flex flex-col rounded-xl mb-20 gap-2'>
      <EducCard educData={educData}/>
      <ExperienceCards/>

      <div className='font-semibold flex flex-col'>License
      <Link to="/licenseform" className='font-thin bg-success rounded-md w-fit pr-3 pl-3 pb-1 pt-1 hover:bg-info text-white'>Add</Link>
      
      </div>

      <div className='font-semibold flex flex-col'>Skills
      <Link to="/skillsform" className='font-thin bg-success rounded-md w-fit pr-3 pl-3 pb-1 pt-1 hover:bg-info text-white'>Add</Link>

      </div>
      
      <div className='font-semibold flex flex-col'>Certifications
      <Link to="/certificationform" className='font-thin bg-success rounded-md w-fit pr-3 pl-3 pb-1 pt-1 hover:bg-info text-white'>Add</Link>

      </div>
    </div>
  )
}

export default PersonCredentials