import React, { useEffect, useState } from "react";
import TopBar from "./topbar";
import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import DateToWords from "./DateFormatter";
import ButtonPrimary from "./ButtonPrimary";
import { useAuthContext } from "../hooks/useAuthContext";

const ResumeViewProfile = () => {
    const { personId } = useParams();
    const [personData, setPersonData] = useState("");
    const [personPref, setPersonPref] = useState("");

    const {user} = useAuthContext()
  
    const downloadResume = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/person/resume/download?id=${personData.userId}`,
          {
            headers: {
              credentials: "include",
            },
          }
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const downloadResumeLog = async () => {
      try {
          const response = await fetch("http://localhost:3000/user/resume/log", {
              method: "POST",
              body: JSON.stringify({"ownerId": personData.userId, "viewerId": user.user.id, "action": "download"}),
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
      } catch (error) {}
  
    }
  
    useEffect(() => {
      const getPersonCredentials = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/person/credentials?id=${personId}`,{
              credentials:'include'
            }
          );
          const getCredReq = await response.json();
          setPersonData(getCredReq);
        } catch (error) {
          console.error("Error fetching credentials:", error);
        }
      };
      
      getPersonCredentials();
    }, []);

    useEffect(()=>{
        const getPersonPreferences = async () => {
            try {
              const response = await fetch(
                `http://localhost:3000/person/preferences?id=${personData.userId}`,{
                  credentials:'include'
                }
              );
              const getCredReq = await response.json();
              setPersonPref(getCredReq);
            } catch (error) {
              console.error("Error fetching preferences:", error);
            }
          };
          getPersonPreferences()

    },[personData])
  
    const handleButtonClick = () => {
      // Call both functions when the button is clicked
      downloadResume();
      downloadResumeLog();
    };
    return (
      <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        
        <TopBar />
  
        <div className="flex flex-row gap-2">
          <SideBar />
  
          <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="pt-5 pr-5 pl-3 overflow-scroll">
              {personData && (
                <div className="w-full bg-white h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col">
                  <div className="flex flex-col gap-1 items-center">
                    <h1 className="font-semibold text-lg">
                      {personData.firstName +
                        " " +
                        personData.middleName +
                        " " +
                        personData.lastName +
                        " " +
                        personData.suffix}
                    </h1>
                    <div className="flex flex-row gap-2">
                      <div>{personData.user.contactNum }</div>
                       <div>&#x2022;</div>
                       <div>{ personData.user.emailAddress}</div>
                    </div>
                  </div>
  
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Experience</span>
                  </div>
                  <div>
                    {personData.experience.map((experience) => (
                      <div key={experience.id} className="flex flex-col mb-5">
                        <span className="font-semibold">
                          {experience.jobTitle}
                        </span>
                        <span className="">{experience.companyName}</span>
                        <div className="flex flex-row gap-1">
                          <span className="font-thin">
                            <DateToWords dateString={experience.startDate} />
                          </span>
                          <span className="font-thin">-</span>
                          <span className="font-thin">
                            <DateToWords dateString={experience.endDate} />
                          </span>
                        </div>
                        {/* <p className="font-thin">{experience.jobDetails}</p> */}
                        <ul className="list-disc ml-8 font-thin">
                          {experience.jobDetails
                            .split("\r\n")
                            .map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
  
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Skills</span>
                  </div>
  
                  <div className="pl-5">
                    <ul className="font-normal list-disc">
                      {personData.skills.map((personSkill) => (
                        <li key={personSkill.id}>
                          {personSkill.skill.skillName}
                        </li>
                      ))}
                    </ul>
                  </div>
  
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Education</span>
                  </div>
  
                  <div className="flex flex-col gap-5">
                    {personData.education.map((education) => (
                      <div key={education.id} className="flex flex-col">
                        <span className="font-semibold">
                          {education.schoolName}
                        </span>
                        <span>{education.degree.degreeName}</span>
                        <div className="flex flex-row gap-1">
                          <span className="font-thin">
                            <DateToWords dateString={education.startDate} />
                          </span>
                          <span className="font-thin">-</span>
                          <span className="font-thin">
                            <DateToWords dateString={education.endDate} />
                          </span>
                        </div>
                        <span className="font-thin">
                          {"QPI: " + education.qpi}
                        </span>
                        <span className="font-thin">{education.awards}</span>
                      </div>
                    ))}
                  </div>
  
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Licenses</span>
                  </div>
  
                  <div className="pl-5">
                    <ul className="font-normal list-disc">
                      {personData.personLicense.map((personLicense) => (
                        <li key={personLicense.id}>
                          {personLicense.license.licenseName}
                        </li>
                      ))}
                    </ul>
                  </div>
  
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Certifications</span>
                  </div>
  
                  <div className="pl-5">
                    <ul className="font-normal list-disc">
                      {personData.certification.map((personCerts) => (
                        <li key={personCerts.id}>
                          {personCerts.certName}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {personPref&&(
                    personPref.allowDownloadResume == true &&(
                        <div className="flex flex-row justify-end w-full">
                        <ButtonPrimary text={"Downlod PDF"} onClick={handleButtonClick}/>
                          </div>
                      )
                  )}
                  
                </div>
              )}
             
            </div>
            
          </div>
        </div>
      </div>
    );
}

export default ResumeViewProfile