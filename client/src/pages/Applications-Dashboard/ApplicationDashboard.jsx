import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import ButtonNavigator from "../../components/ButtonNavigator";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DateToWords from "../../components/DateFormatter";

const ApplicationDashboard = () => {

    const[applicationData,setApplicationData] = useState([])
    const [userRole, setUserRole] = useState([]);

    useEffect(()=>{
        const fetchUserRole = async () => {
          try {
            const response = await fetch("http://localhost:3000/user/role");
            const getUserResult = await response.json();
            setUserRole(getUserResult);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
      
        };
          const fetchApplications = async () => {
              try {
                const response = await fetch("http://localhost:3000/api/getjobpostapplications");
                const getJobRes = await response.json();
                setApplicationData(getJobRes);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchUserRole()
            fetchApplications()
       },[])
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      

      <div className="flex flex-row gap-2">
        <SideBar userRole={userRole}/>

        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
            <div className="pt-5 pr-5 pl-3 overflow-x-auto">
                <table className="table bg-white rounded-xl mb-3">
                    <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Details</th>
                        <th>Date Created</th>
                    </tr>
                    </thead>
                    <tbody>
                        {applicationData.map((job)=>(
                        <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td>{job.jobPost.jobTitle}</td>
                            <td>{job.jobPost.company.companyName}</td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                            <td><DateToWords dateString={job.dateCreated}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


      </div>
    </div>
  )
}

export default ApplicationDashboard