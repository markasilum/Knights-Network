import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import EducationForm from '../pages/Create-Credentials/EducationForm';
import EditEducation from '../pages/Edit-Credentials/EditEducation';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EducCard = ({educData}) => {
  const[degree, setDegree] = useState([])
  const degreeIds = educData.map(educ => educ.degreeId)
  
  useEffect(()=>{
    const fetchDegree = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/degree/index?ids=${degreeIds.join(',')}`,{
          credentials:'include'
        });
        const getUserResult = await response.json();
        setDegree(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchDegree()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2 pb-1 items-end'>
            <span className='font-bold'>Education</span>
            <div className='flex gap-3'>
            <button className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-success' onClick={()=>document.getElementById('add_education').showModal()}><AddOutlinedIcon fontSize='medium'/></button>
            <Link className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-accent' to={"/education-edit"}><EditOutlinedIcon fontSize='medium'/></Link>
            </div>
        </div>
        <EducationForm/>
        
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
  )
}

export default EducCard