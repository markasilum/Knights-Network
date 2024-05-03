import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import ButtonNavigator from "../../components/ButtonNavigator";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DateToWords from "../../components/DateFormatter";
import DateConverter from "../../components/DateConverter";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const ApplicationDashboard = () => {

    const[applicationData,setApplicationData] = useState([])
    const [filterStat, setFilterStat] = useState('all')

    const handleFilter = (status) =>{
      setFilterStat(status)
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:3000/application/person/index",{
          credentials:'include'
        });
        const getJobRes = await response.json();
        setApplicationData(getJobRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleArchive = async (id) =>{
      // console.log(appId+ " "+status)
      const formData = new FormData();
      formData.append("id", id);
      try {
        const response = await fetch(
          "http://localhost:3000/application/archive",
          {
            method: "PUT",
            body: formData,
            credentials: "include",
          }
        );
        fetchApplications();
      } catch (error) {
        console.error("Error updating status:", error);
    };
  }

    useEffect(()=>{
         
            fetchApplications()
       },[])

       
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar/>
          <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="pt-2 pr-2 pl-2 mt-2 mr-2 overflow-x-auto rounded-xl bg-white">
                <div className="flex flex-row gap-2 items-center pb-3 bg-white">
                <div className="font-thin">Status: </div>
                                <select
                                  className="select select-bordered select-xs w-24 mt-2 max-w-xs font-thin"
                                  defaultValue={filterStat}
                                  onChange={(e) => {handleFilter(e.target.value)}}
                                >
                                  <option value={"all"}>All</option>
                                  <option value="pending">Pending</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="rejected">Rejected</option>
                                  <option value="archived">Archived</option>
                                </select>
                </div>
                <div className="border-b-2 border-dashed border-info"></div>

                <table className="table bg-white rounded-none mb-3 ">
                    <thead >
                    <tr >
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Details</th>
                        <th>Date Created</th>
                        <th>Application Status</th>
                        <th>Archive</th>
                    </tr>
                    </thead>
                    <tbody>
                      {/* {applicationData&&(
                         applicationData
                         .filter(job => job.isArchive === false) // Filter jobs with status "pending"
                         .map(job => (

                         ))
                      )} */}
                      {applicationData && (applicationData
                        .filter(job => !job.isArchived && job.status === filterStat)
                        .map(job => (
                          <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td>{job.jobPost.jobTitle}</td>
                            <td>{job.jobPost.company.companyName}</td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}>View Details</Link></td>
                            <td><DateConverter isoString={job.dateCreated}/></td>
                            <td>{job.status}</td>
                            <td>
                              <button className="hover:text-error active:text-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon fontSize="small"/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      <button className="btn btn-error text-white" onClick={()=>handleArchive(job.id)}>Archive</button>
                                    </form>
                                  </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                  <button>close</button>
                                </form>
                              </dialog>
                            </td>
                          </tr>
                      )))}

                        {applicationData && (applicationData
                        .filter(job => !job.isArchived && filterStat === 'all')
                        .map(job => (
                          <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td>{job.jobPost.jobTitle}</td>
                            <td>{job.jobPost.company.companyName}</td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}>View Details</Link></td>
                            <td><DateConverter isoString={job.dateCreated}/></td>
                            <td>{job.status}</td>
                            <td>
                              <button className="hover:text-error active:text-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon fontSize="small"/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      <button className="btn btn-error text-white" onClick={()=>handleArchive(job.id)}>Archive</button>
                                    </form>
                                  </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                  <button>close</button>
                                </form>
                              </dialog>
                            </td>
                          </tr>
                      )))} 

                      {applicationData && (applicationData
                        .filter(job => job.isArchived && filterStat === 'archived')
                        .map(job => (
                          <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td>{job.jobPost.jobTitle}</td>
                            <td>{job.jobPost.company.companyName}</td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}>View Details</Link></td>
                            <td><DateConverter isoString={job.dateCreated}/></td>
                            <td>{job.status}</td>
                            <td className="underline text-accent">Archived</td>
                          </tr>
                      )))}  

                     

                    {/* {filterStat == 'all'&&(
                       applicationData
                       .map(job => (
                         <tr key={job.id} className='p-2  w-full align-center hover'>
                           <td>{job.jobPost.jobTitle}</td>
                           <td>{job.jobPost.company.companyName}</td>
                           <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                           <td><DateConverter isoString={job.dateCreated}/></td>
                           <td>{job.status}</td>
                           <td>
                              <button className="hover:text-error active:text-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon fontSize="small"/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      <button className="btn" onClick={handleArchive(job.id)}>Archive</button>
                                    </form>
                                  </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                  <button>close</button>
                                </form>
                              </dialog>
                            </td>
                         </tr>
                       ))
                    )}   */}
                      
                      
                    </tbody>
                </table>
            </div>
        </div>


      </div>
    </div>
  )
}

export default ApplicationDashboard