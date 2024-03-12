import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
const ExperienceCards = () => {
const[experience, setExperience] = useState([])

useEffect(()=>{
    const fetchExperience = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/experience/person/index`);
        const getUserResult = await response.json();
        setExperience(getUserResult);
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
            <span className='font-bold'>Experience</span>
            <Link to="/expform" className='font-thin underline'>Edit</Link>
        </div>
        
        {experience.map((experience)=>(
          <div key={experience.id} className='flex flex-col mb-5'>
              <span className='font-semibold'>{experience.jobTitle}</span>
              <span className=''>{experience.companyName}</span>
              <p className='font-thin'>{experience.jobDetails}</p>
              <div className='flex flex-row gap-1'>
              <span className='font-thin'><DateToWords dateString={experience.startDate} /></span>
              <span className='font-thin'>-</span>
              <span className='font-thin'><DateToWords dateString={experience.endDate} /></span>
              </div>
             
          </div>
        ))}
        
        <Link to="/expform" className='font-thin bg-success rounded-md pr-3 pl-3 pb-1 pt-1 hover:bg-info text-white'>Add</Link>

      </div>
  )
}

export default ExperienceCards