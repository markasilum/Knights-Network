import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import SkillsForm from '../pages/Create-Credentials/SkillsForm';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const SkillsCard = () => {
  const[skills, setSkills] = useState([])

  const fetchSkills = async () =>{
    try {
      const response = await fetch(`http://localhost:3000/skills/person/index`,{
        credentials:'include'
      });
      const getUserResult = await response.json();
      setSkills(getUserResult);
      // console.log(getUserResult)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    
    fetchSkills()
    
  },[]);
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Skills</span>
            <div className='flex gap-3'>
            <button className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-success' onClick={()=>document.getElementById('add_skill').showModal()}><AddOutlinedIcon fontSize='medium'/></button>
            <Link to="/skills-edit" className='hover:bg-neutral hover:rounded-full active:text-info p-1 hover:text-accent'><EditOutlinedIcon fontSize='medium'/></Link>
            </div>
        </div>
        <SkillsForm fetchSkills={fetchSkills}/>

        {/* <span className='font-normal'>{skills.join(", ")}</span> */}
        <ul className='font-normal list-disc ml-5'>
        {skills.map((skill)=>(
          
             <li key={skill.id} >{skill.skillName}</li>
          
        ))}
        </ul>

      </div>
  )
}

export default SkillsCard