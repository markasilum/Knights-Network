import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import ButtonNavigator from "../../components/ButtonNavigator";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DateToWords from "../../components/DateFormatter";

const JobPostsDashboard = () => {
 const[jobPostData,setJobPostData] = useState([])


 useEffect(()=>{
    const fetchCompanyJobPost = async () => {
        try {
          const response = await fetch("http://localhost:3000/jobpost/company/index");
          const getJobRes = await response.json();
          setJobPostData(getJobRes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchCompanyJobPost()
 },[])

  return (
            <div className="pt-5 pr-5 pl-3 overflow-x-auto">
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
                            <td>0</td>
                            <td><input type="checkbox" className="toggle toggle-success"/></td>
                            <td><Link className="underline" to={`/job-post-details/${job.id}`}  >View Details</Link></td>
                            <td><DateToWords dateString={job.dateCreated}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <ButtonNavigator text={"New Job"} path={"/createjobpost"}/>    
            </div>
  );
};

export default JobPostsDashboard;
