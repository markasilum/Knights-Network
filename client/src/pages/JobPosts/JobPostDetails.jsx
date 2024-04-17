import React, { useEffect, useState, useContext } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import {useParams} from "react-router-dom";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSuccess from "../../components/ButtonSuccess";
import { RoleContext } from "../../App";
const JobPostDetails = () => {

  const {role} = useContext(RoleContext)

  const [jobData, setJobData] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [jobLicense, setJobLicense] = useState([]);
  const [jobDegree, setJobDegree] = useState([]);
  const { jobPostId } = useParams();
  const[applicationData,setApplicationData] = useState([])


  useEffect(() => {
  
    const fetchJobPostDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobpost/details?id=${jobPostId}`
        );
        const getJobRes = await response.json();
        setJobData(getJobRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchJobPostSkills = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobpost/requirements/skills?id=${jobPostId}`
        );
        const getJobSkillsRes = await response.json();
        setJobSkills(getJobSkillsRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchJobPostLicense = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobpost/requirements/license?id=${jobPostId}`
        );
        const getJobSkillsRes = await response.json();
        setJobLicense(getJobSkillsRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchJobPostDegree = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobpost/requirements/degree?id=${jobPostId}`
        );
        const getJobDegreeRes = await response.json();
        setJobDegree(getJobDegreeRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/application/check?id=${jobPostId}`
        );
        const getApplicationData = await response.json();
        setApplicationData(getApplicationData);
        // console.log(getApplicationData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  

    
    fetchJobPostDetails();
    fetchJobPostDegree();
    fetchJobPostSkills();
    fetchJobPostLicense();
    fetchApplication()
  }, []);

  const handleApplication = async (event) =>{
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/application/create', {
        method: 'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({'id':jobData.id})
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }else{
        console.log("Application Sent")
      }
      
    } catch (error) {
      console.error('Error sending application:', error);
    }



  }
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-auto">
            <div className="w-full bg-white h-fit min-h-80 p-5 rounded-xl mb-20 flex flex-col">
            <div className="w-full flex flex-row justify-between">
              <div className="font-semibold text-2xl">{jobData.jobTitle}</div>
              {role.roleName =="company"&&(
                  <button className='font-thin underline' onClick={()=>document.getElementById(jobData.id).showModal()}>Edit</button>
              )}
            </div>

              {jobData.company && jobData.company.companyName && (
                <h2 className="font-semibold">{jobData.company.companyName}</h2>
              )}
              <div className="font-normal">{jobData.jobLoc}</div>

              <div className="font-thin flex flex-col mt-3">
                <p className="font-semibold">Job Description</p>
                <ul className="list-disc ml-6">
                  {jobData.jobDesc &&
                    jobData.jobDesc
                      .split("\r\n")
                      .map((line, index) => <li key={index}>{line}</li>)}
                </ul>
              </div>

              <div className="mt-5">
                <div className="font-semibold">Qualifications</div>
                <ul className="list-disc">
                  {jobDegree != "" && (
                    <li className="ml-10">Degree: <span className="font-thin">{jobDegree.join(", ")}</span></li>
                  )}
                  {jobSkills != "" && (
                    <li className="ml-10">Skills: <span className="font-thin">{jobSkills.join(", ")}</span></li>
                  )}
                  {jobLicense != "" && (
                    <li className="ml-10">License: <span className="font-thin">{jobLicense.join(", ")}</span></li>
                  )}
                </ul>
              </div>

              <div className="mt-3 w-full flex flex-row justify-between items-center">
                <div>
                  <h2>
                    Employment Type:{" "}
                    <span className="font-thin">{jobData.employmentType}</span>
                  </h2>
                  <h2>
                    Work Model:{" "}
                    <span className="font-thin">{jobData.workModel}</span>
                  </h2>
                  <h2>
                    Salary:{" "}
                    <span className="font-thin">{jobData.salary}</span>
                  </h2>
                  <h2 className="mt-3">
                    Number of Positions Available:{" "}
                    <span className="font-thin">{jobData.numOfPosition}</span>
                  </h2>
                </div>
              </div>
              

              {role.roleName !== "company" && applicationData === false &&
                <div className="w-full flex flex-row justify-end">
                  <ButtonPrimary text={"Apply"} onClick={handleApplication}/> 
                </div>
              }

              {role.roleName !== "company" && applicationData === true &&
                <div className="w-full flex flex-row justify-end">
                  <ButtonSuccess text={"Application Sent"}/> 
                </div>
              }


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostDetails;
