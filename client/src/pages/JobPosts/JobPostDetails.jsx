import React, { useEffect, useState, useContext } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import {useParams} from "react-router-dom";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSuccess from "../../components/ButtonSuccess";
import EditJobPost from "./EditJobPost";
import { useAuthContext } from "../../hooks/useAuthContext";
const JobPostDetails = () => {

  const {user} = useAuthContext()
  const role = user.user.role
  
  const [jobData, setJobData] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [jobLicense, setJobLicense] = useState([]);
  const [jobDegree, setJobDegree] = useState([]);
  const { jobPostId } = useParams();
  const[applicationData,setApplicationData] = useState([])

  const fetchApplication = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/application/check?id=${jobPostId}`,{
          credentials:'include'
        }
      );
      const getApplicationData = await response.json();
      console.log(getApplicationData)

      setApplicationData(getApplicationData);
      // console.log(getApplicationData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
  
    const fetchJobPostDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobpost/details?id=${jobPostId}`,{
            credentials:'include'
          }
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
          `http://localhost:3000/jobpost/requirements/skills?id=${jobPostId}`,{
            credentials:'include'
          }
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
          `http://localhost:3000/jobpost/requirements/license?id=${jobPostId}`,{
            credentials:'include'
          }
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
          `http://localhost:3000/jobpost/requirements/degree?id=${jobPostId}`,{
            credentials:'include'
          }
        );
        const getJobDegreeRes = await response.json();
        setJobDegree(getJobDegreeRes);
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
        body: JSON.stringify({'id':jobData.id}),
        credentials:'include'
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      fetchApplication()  
    } catch (error) {
      console.error('Error sending application:', error);
    }



  }
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-auto">
            <div className="w-full bg-white h-fit min-h-80 p-5 rounded-lg mb-20 flex flex-col">
              <div className="w-full flex flex-row justify-between">
                {/* {console.log(jobDegree)} */}
                <div className="font-gothamBook text-3xl">{jobData.jobTitle}</div>
                {role.roleName == "company" && (
                  <button
                    className="underline font-gothamLight"
                    onClick={() =>
                      document.getElementById(jobData.id).showModal()
                    }
                  >
                    Edit
                  </button>
                )}
                {jobData.length != 0 && (
                  <EditJobPost
                    jobData={jobData}
                    jobDegree={jobDegree}
                    jobSkills={jobSkills}
                    jobLicense={jobLicense}
                  />
                )}
              </div>

              {jobData.company && jobData.company.companyName && (
                <h2 className="font-gothamLight mt-2 text-lg">{jobData.company.companyName}</h2>
              )}
              <div className="text-md">{jobData.jobLoc}</div>

              <div className="font-thin flex flex-col mt-3">
                <p className="font-normal">Job Description</p>
                <ul className="list-disc ml-6">
                  {jobData.jobDesc &&
                    jobData.jobDesc
                      .split("\r\n")
                      .map((line, index) => <li key={index}>{line}</li>)}
                </ul>
              </div>

              <div className="mt-5">
                <div className="font-normal">Qualifications</div>
                <ul className="list-disc">
                  {jobDegree.length !== 0 && (
                    
                    <li className="font-thin ml-10">
                      <span>Bachelor's degree in </span>
                      {jobDegree.map((degree, index) =>
                        index == jobDegree.length - 1 &&
                        jobDegree.length != 1 ? (
                          <span key={degree}>or {degree}</span>
                        ) : (
                          <span key={degree}>{degree}, </span>
                        )
                      )}
                    </li>
                  )}
                  {jobSkills != "" &&
                    jobSkills.map((skill) => (
                      <li key={skill} className="font-thin ml-10">
                        {skill}
                      </li>
                    ))}
                  {jobLicense != "" &&  
                  jobLicense.map((license) => (
                      <li key={license} className="font-thin ml-10">
                        {license}
                      </li>
                    ))}
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
                    Salary: <span className="font-thin">{jobData.salary}</span>
                  </h2>
                  <h2 className="mt-3">
                    Number of Positions Available:{" "}
                    <span className="font-thin">{jobData.numOfPosition}</span>
                  </h2>
                </div>
              </div>

              {role.roleName !== "company" && !applicationData && (
                <div className="w-full flex flex-row justify-end">
                  <ButtonPrimary text={"Apply"} onClick={handleApplication} />
                </div>
              )}

              {role.roleName !== "company" && applicationData && (
                <div className="w-full flex flex-row justify-end">
                  {applicationData.status=='accepted'&&(
                       <ButtonSuccess key={applicationData.id} text={`Application ${applicationData.status}`} />
                  )}
                  {applicationData.status =='rejected'&&(
                      <button key={applicationData.id} className="btn btn-error text-white">{`Application ${applicationData.status}`}</button>

                  )
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostDetails;
