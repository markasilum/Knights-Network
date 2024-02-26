import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";
const JobPostDetails = () => {
    const[jobData, setJobData] = useState([])

    const { jobPostId } = useParams();
    useEffect(()=>{
        const fetchJobPostDetails = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/getjobdetails?id=${jobPostId}`);
              const getJobRes = await response.json();
              setJobData(getJobRes);
              // console.log(getEducRes)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

          fetchJobPostDetails()



    },[]);

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        <TopBar/>

        <div className="flex flex-row gap-2">
            <SideBar/>
            <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
                <div className="pt-5 pr-5 pl-3 overflow-auto">
                <div className="w-full bg-white h-fit min-h-80 p-5 rounded-xl mb-2 flex flex-col gap-5">
                
                    <div >
                        <span className='font-semibold'>Job Title</span>
                        <div className='ml-5'>{jobData.jobTitle}</div>
                    </div>

                
                    <div >
                        <span className='font-semibold'>Job Description</span>
                        <div className='ml-5'>{jobData.jobDesc}</div>
                    </div>

                    <div>
                    <div className='font-semibold'>Qualification</div>
                    <span className='ml-5'>---To follow---</span>

                    </div>


                    <div>
                    <div className='font-semibold'>Location</div>
                    <div className='ml-5'>{jobData.jobLoc}</div>

                    </div>
                    
                    <div>
                    <div className='font-semibold'>Work Model</div>
                    <div className='ml-5'>{jobData.workModel}</div>

                    </div>

                  <div>
                  <div className='font-semibold'>Salary</div>
                    <div className='ml-5'>{jobData.salary}</div>

                  </div>

                    <div>
                    <div className='font-semibold'>Employment Type</div>
                    <div className='ml-5'>{jobData.employmentType}</div>
                    </div>

                    

                </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobPostDetails