import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import SkillsForm from '../pages/Create-Credentials/SkillsForm';
const SkillsCard = () => {
  const[skills, setSkills] = useState([])

  useEffect(()=>{
    const fetchSkills = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/skills/person/index`);
        const getUserResult = await response.json();
        setSkills(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSkills()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Skills</span>
            <div className='flex gap-3'>
            <button className='font-thin underline' onClick={()=>document.getElementById('add_skill').showModal()}>Add</button>
            <Link to="/skillsform" className='font-thin underline'>Edit</Link>
            </div>
        </div>
        <SkillsForm/>

        <span className='font-normal'>{skills.join(", ")}</span>

      </div>
  )
}

export default SkillsCard