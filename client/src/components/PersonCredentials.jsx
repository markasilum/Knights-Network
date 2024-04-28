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
    <div className='overflow-auto-y w-full  bg-white h-fit mt-3 p-5 flex flex-col rounded-xl mb-20 gap-2'>
      <EducCard educData={educData}/>
      <ExperienceCards/>
      <LicenseCard/>
      <SkillsCard/>
      <CertificationsCard/>
      <div className='w-full flex flex-row justify-end'>
      <ButtonNavigator path={`/resume`} text={"View Resume"}/>
      </div>


    </div>
  )
}

export default PersonCredentials