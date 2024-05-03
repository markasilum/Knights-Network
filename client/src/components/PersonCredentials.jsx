import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
import EducCard from './EducCard';
import ExperienceCards from './ExperienceCards';
import LicenseCard from './LicenseCard';
import SkillsCard from './SkillsCard';
import CertificationsCard from './CertificationsCard';
import ButtonPrimary from './ButtonPrimary';
import ButtonNavigator from './ButtonNavigator';

const PersonCredentials = ({educData}) => {
  
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit mt-2 p-4 flex flex-col rounded-xl mb-20 gap-2'>
      <ExperienceCards/>
      <SkillsCard/> 
      <EducCard educData={educData}/>
      <LicenseCard/>
      <CertificationsCard/>
      <div className='w-full flex flex-row justify-end'>
      <ButtonNavigator path={`/resume`} text={"View Resume"}/>
      </div>


    </div>
  )
}

export default PersonCredentials