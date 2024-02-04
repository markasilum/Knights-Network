import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route, useParams,
  Link
} from "react-router-dom";
import DateToWords from './DateFormatter';

const PersonCredentials = ({educData}) => {
  const[degree, setDegree] = useState([])
  const degreeIds = educData.map(educ => educ.degreeId)
  
  useEffect(()=>{
    const fetchDegree = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/api/getdegree?ids=${degreeIds.join(',')}`);
        const getUserResult = await response.json();
        setDegree(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchDegree()
    
  },[]);

  console.log(degree)

  return (
    <div className='overflow-auto-y w-full  bg-white h-fit mt-3 p-5 flex flex-col rounded-xl mb-5 gap-5'>
      <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Education</span>
            <Link to="/credentials" className='font-thin underline'>Edit</Link>
        </div>
        
        {educData.map((education)=>(
          <div key={education.id} className='flex flex-col mb-5'>
              <span className='font-semibold'>{education.schoolName}</span>
              {degree.find((deg) => deg.id === education.degreeId) && (
              <span className=''>
                {
                  degree.find((deg) => deg.id === education.degreeId).degreeName
                }
              </span>
            )}
              <div className='flex flex-row gap-1'>
              <span className='font-thin'><DateToWords dateString={education.startDate} /></span>
              <span className='font-thin'>-</span>
              <span className='font-thin'><DateToWords dateString={education.endDate} /></span>
              </div>
              <span className='font-thin'>{"QPI: " +education.qpi}</span>
              <span className='font-thin'>{education.awards}</span>


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