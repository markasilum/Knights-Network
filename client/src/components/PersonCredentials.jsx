import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import DateToWords from './DateFormatter';
const PersonCredentials = ({educData}) => {
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5 gap-5'>
      <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral'>
            <span className='font-semibold'>Education</span>
            <Link to="/credentials" className='font-thin underline'>Edit</Link>
        </div>
        {educData.map((education)=>(
          <div key={education.id} className='flex flex-col mb-5'>
              <span>{education.schoolName}</span>
              <span>{education.qpi}</span>
              <span><DateToWords dateString={education.startDate}/></span>
              <span><DateToWords dateString={education.endDate}/></span>
              <span>{education.awards}</span>


          </div>
        ))}
        
      
      </div>

      <div className='font-semibold'>Experience
      
      </div>

      <div className='font-semibold'>License
      
      </div>

      <div className='font-semibold'>Skills
      
      </div>
      
      <div className='font-semibold'>Certifications
      
      </div>
    </div>
  )
}

export default PersonCredentials