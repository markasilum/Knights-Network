import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import ButtonNavigator from "../../components/ButtonNavigator";
import {Link} from "react-router-dom";
import DateToWords from "../../components/DateFormatter";

const JobPostsDashboard = () => {
 const[jobPostData,setJobPostData] = useState([])

 const fetchCompanyJobPost = async () => {
  try {
    const response = await fetch("http://localhost:3000/jobpost/company/index",{
      credentials:'include'
    });
    const getJobRes = await response.json();
    setJobPostData(getJobRes);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 useEffect(()=>{
      fetchCompanyJobPost()  
 },[])


 const handleStatusChange = async (jobId, status) => {

  const formData = new FormData();

  formData.append('id', jobId)
  formData.append('isOpen', status)

   try {
    const response = await fetch('http://localhost:3000/jobpost/set-status', {
        method: 'POST',
        body: formData,
        credentials:'include'
      });

      fetchCompanyJobPost()  

   } catch (error) {
    console.error('Error updating status:', error);
   }
 }

 

 //get request with parameter 

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      {/* {jobPostData&&(
        console.log(jobPostData)
      )} */}
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar/>

        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
            <div className="pt-5 pr-5 pl-3 overflow-scroll">
                <table className="table bg-white rounded-xl mb-3">
                    <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Applicants</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Date Created</th>
                    </tr>
                    </thead>
                    <tbody>
                        {jobPostData.map((job)=>(
                        <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td>{job.jobTitle}</td>
                            <td className=""><Link className="underline" to={`/jobpost/applicants/${job.id}`}>{job.application.length}</Link></td>
                            <td> <input type="checkbox" className="toggle toggle-success" checked={job.isOpen} onChange={(e) => {handleStatusChange(job.id, !job.isOpen)}}/></td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.id}`}  >View Details</Link></td>
                            <td><DateToWords dateString={job.dateCreated}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <ButtonNavigator text={"New Job"} path={"/createjobpost"}/>    
            </div>
        </div>


      </div>
    </div>
  );
};

export default JobPostsDashboard;
