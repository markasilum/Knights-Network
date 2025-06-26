import React, { useEffect, useState } from "react";
import ExperienceCards from "../../components/ExperienceCards";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DateToWords from "../../components/DateFormatter";
import ButtonNavigator from "../../components/ButtonNavigator";
import { useAuthContext } from "../../hooks/useAuthContext";
const ViewCredentials = ({personId, experience, skills,educData,licenses,certs,preferences, userId }) => {

  const{user} = useAuthContext()

  const viewResume = async () => {
    try {
        const response = await fetch("http://localhost:3000/user/resume/log", {
            method: "POST",
            body: JSON.stringify({"ownerId": userId, "viewerId": user.user.id, "action": "view"}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {}

  }
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit mt-2 p-4 flex flex-col rounded-xl mb-20 gap-2">
      <div>
        <div className="flex flex-row justify-between border-b-2 border-solid border-neutral mb-2">
          <span className="font-bold">Experience</span>
        </div>

        {experience.map((experience) => (
          <div key={experience.id} className="flex flex-col mb-5">
            <span className="font-semibold">{experience.jobTitle}</span>
            <span className="">{experience.companyName}</span>
            <div className="flex flex-row gap-1 mb-2">
              <span className="font-thin">
                <DateToWords dateString={experience.startDate} />
              </span>
              <span className="font-thin">-</span>
              {experience.endDate&&(
                <span className="font-thin">
                <DateToWords dateString={experience.endDate} />
              </span>
              )}
              {!experience.endDate&&(
                <span className="font-thin">
                present
              </span>
              )}
            </div>
            <ul className="list-disc ml-8 font-thin">
              {experience.jobDetails.split("\r\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="">
        <div className="flex flex-row justify-between border-b-2 border-solid border-neutral mb-2">
          <span className="font-bold">Skills</span>
        </div>

        <ul className="font-normal list-disc ml-5">
          {skills.map((skill) => (
            <li key={skill.id}>{skill.skill.skillName}</li>
          ))}
        </ul>
      </div>

      <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2 mt-5 pb-1 items-end'>
            <span className='font-bold'>Education</span>
        </div>
        
        {educData.map((education)=>(
          <div key={education.id} className='flex flex-col mb-5'>
              <span className='font-semibold'>{education.schoolName}</span>
              <span className=''>{education.degree.degreeName}</span>
              <div className='flex flex-row gap-1'>
              <span className='font-thin'><DateToWords dateString={education.startDate} /></span>
              <span className='font-thin'>-</span>
              {education.endDate&&(
                  <span className='font-thin'><DateToWords dateString={education.endDate} /></span>
              )}
              {!education.endDate&&(
                  <span className='font-thin'>present</span>
              )}
              </div>
              <span className='font-thin'>{"QPI: " +education.qpi}</span>
              <span className='font-thin'>{education.awards}</span>
          </div>
        ))}
      </div>

      <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>License</span>
        </div>
        <ul className='font-normal list-disc ml-5'>
        {licenses.map((license)=>(
         
             <li key={license.id}>{license.license.licenseName}</li>
         
        ))}
        </ul>
      </div>

      <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Certifications</span>
        </div>

        <ul className='font-normal list-disc ml-5'>
        {
          certs.map((cert)=>(
            <li key={cert.id}>{cert.certName}</li>
          ))
        }
        </ul>

      </div>

      {preferences.allowViewResume == true &&(
        <div className='w-full flex flex-row justify-end'>
          <ButtonNavigator path={`/person/resume/view/${personId}`} text={"View Resume"} onClick={viewResume}/>
        </div> 
      )}  
    </div>
  );
};

export default ViewCredentials;
