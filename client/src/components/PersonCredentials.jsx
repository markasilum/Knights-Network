import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
const PersonCredentials = () => {
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5 gap-5'>
      <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral'>
            <span className='font-semibold'>Education</span>
            <Link to="/credentials" className='font-thin underline'>Edit</Link>
        </div>
        <div className='flex flex-col'>
          Ateneo de Davao University
          BS Information Technology
        </div>
        
      
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