import React, { useEffect, useState, useContext } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSuccess from "../../components/ButtonSuccess";
import EditJobPost from "./EditJobPost";
import { useAuthContext } from "../../hooks/useAuthContext";

const JobPostView = () => {
  const { user } = useAuthContext();
  const role = user.user.role;

  const [jobData, setJobData] = useState([]);
  const [appLetterFile, setAppLetterFile] = useState("");
  const [jobSkills, setJobSkills] = useState([]);
  const [jobLicense, setJobLicense] = useState([]);
  const [jobDegree, setJobDegree] = useState([]);
  const { jobPostId } = useParams();
  const [applicationData, setApplicationData] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchApplication = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/application/check?id=${jobPostId}`,
        {
          credentials: "include",
        }
      );
      const getApplicationData = await response.json();

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
          `http://localhost:3000/jobpost/details?id=${jobPostId}`,
          {
            credentials: "include",
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
          `http://localhost:3000/jobpost/requirements/skills?id=${jobPostId}`,
          {
            credentials: "include",
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
          `http://localhost:3000/jobpost/requirements/license?id=${jobPostId}`,
          {
            credentials: "include",
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
          `http://localhost:3000/jobpost/requirements/degree?id=${jobPostId}`,
          {
            credentials: "include",
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
    fetchApplication();
  }, [jobPostId]);

  const handleApplication = async (event) => {
    event.preventDefault();
    setErrors({})
    try {
      const formData = new FormData();
    formData.append("id", jobData.id);
    if (appLetterFile) {
      console.log(appLetterFile);
      formData.append("appLetterFile", appLetterFile);
    }

    if(jobData.isAppLetterReq == true && appLetterFile == ""){
      throw new Error("Application letter required");
    }
      const response = await fetch("http://localhost:3000/application/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      fetchApplication();
    } catch (error) {
      if (error.message == "Application letter required") {
        setErrors({ appLetError: "Application letter required" });
      } 
      console.error("Error sending application:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setAppLetterFile(null);
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }
    // If file is valid, update the image state and set image preview URL
    setAppLetterFile(file);
  };

  const handleRemoveImage = () => {
    setAppLetterFile(null);
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-2 pr-2 overflow-auto">
            <div className="w-full bg-white h-fit min-h-80 p-5 rounded-lg mb-20 flex flex-col">
              <div className="w-full flex flex-row justify-between">
                {/* {console.log(jobDegree)} */}
                <div className="font-gothamBook text-3xl">
                  {jobData.jobTitle}
                </div>

              </div>

              {jobData.company && jobData.company.companyName && (
                  <Link className={`font-gothamLight mt-2 text-lg hover:underline decoration-1`} to={`/profile/view/${jobData.companyId}`}>{jobData.company.companyName}</Link>
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
                    jobSkills.map((skill, index) => (
                      <li key={index} className="font-thin ml-10">
                        {skill}
                      </li>
                    ))}
                  {jobLicense != "" &&
                    jobLicense.map((license, index) => (
                      <li key={index} className="font-thin ml-10">
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

              {role.roleName !== "company" && !applicationData &&  jobData.isAppLetterReq == true && (
                <div className="w-full flex flex-col mt-5 items-end">
                  <p className="">Application Letter Required: </p>
                  <div className="flex flex-row gap-2">
                    {appLetterFile && (
                      <button
                        onClick={handleRemoveImage}
                        className="btn btn-info btn-sm text-white ml-3"
                      >
                        Remove File
                      </button>
                    )}
                    <div className="flex flex-col items-end">
                    <input
                      id="fileInput"
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      onChange={handleFileChange}
                      required
                    />
                    {errors.appLetError && (
                  <span className="text-error  font-normal h-2">
                    {errors.appLetError}
                  </span>
                )}
                    </div>
                    
                    
                  </div>
                </div>
              )}
              {role.roleName !== "company" && !applicationData && (
                <div className="w-full flex flex-row justify-end">
                  <ButtonPrimary text={"Apply"} onClick={handleApplication} />
                </div>
              )}

              {role.roleName !== "company" && applicationData && (
                <div className="w-full flex flex-row justify-end">
                  {applicationData.status == "accepted" && (
                    <button
                      key={applicationData.id}
                      className="btn btn-success text-white pointer-events-none	"
                    >{`Application ${applicationData.status}`}</button>
                  )}
                  {applicationData.status == "rejected" && (
                    <button
                      key={applicationData.id}
                      className="btn btn-error text-white pointer-events-none	"
                    >{`Application ${applicationData.status}`}</button>
                  )}
                  {applicationData.status == "pending" && (
                    <button
                      key={applicationData.id}
                      className="btn btn-info text-white mt-3 pointer-events-none	"
                    >{`Application ${applicationData.status}`}</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostView;
