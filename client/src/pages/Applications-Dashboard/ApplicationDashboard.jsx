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

    useEffect(()=>{
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
            fetchApplications()
       },[])
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      

      <div className="flex flex-row gap-2">
        <SideBar/>

        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="pt-3 pr-5 pl-3 mt-2 overflow-x-auto">
                <div className="flex flex-row gap-2 items-center p-2 bg-white">
                <div className="font-thin ml-2">Status: </div>
                                <select
                                  className="select select-bordered select-xs w-24 mt-2 max-w-xs font-thin"
                                  defaultValue={filterStat}
                                  onChange={(e) => {handleFilter(e.target.value)}}
                                >
                                  <option value={"all"}>All</option>
                                  <option value="pending">Pending</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                </div>
                <table className="table bg-white rounded-none mb-3 ">
                    <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Details</th>
                        <th>Date Created</th>
                        <th>Application Status</th>
                        <th>Archive</th>
                    </tr>
                    </thead>
                    <tbody>
                      {filterStat == 'pending'&&(
                        applicationData
                        .filter(job => job.status === "pending") // Filter jobs with status "pending"
                        .map(job => (
                         
                         
                          <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td >{job.jobPost.jobTitle}</td>
                            <td>{job.jobPost.company.companyName}</td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                            <td><DateConverter isoString={job.dateCreated}/></td>
                            <td>{job.status}</td>
                            <td>
                              <button className="active:bg-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      {/* if there is a button in form, it will close the modal */}
                                      <button className="btn">Archive</button>
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
                      )}

                      

                    {filterStat == 'accepted'&&(
                       applicationData
                       .filter(job => job.status === "accepted") // Filter jobs with status "pending"
                       .map(job => (
                         <tr key={job.id} className='p-2  w-full align-center hover'>
                           <td>{job.jobPost.jobTitle}</td>
                           <td>{job.jobPost.company.companyName}</td>
                           <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                           <td><DateConverter isoString={job.dateCreated}/></td>
                           <td>{job.status}</td>
                           <td>
                              <button className="active:bg-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      {/* if there is a button in form, it will close the modal */}
                                      <button className="btn">Archive</button>
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
                    )}
                    {filterStat == 'rejected'&&(
                       applicationData
                       .filter(job => job.status === "rejected") // Filter jobs with status "pending"
                       .map(job => (
                         <tr key={job.id} className='p-2  w-full align-center hover'>
                           <td>{job.jobPost.jobTitle}</td>
                           <td>{job.jobPost.company.companyName}</td>
                           <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                           <td><DateConverter isoString={job.dateCreated}/></td>
                           <td>{job.status}</td>
                           <td>
                              <button className="active:bg-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      {/* if there is a button in form, it will close the modal */}
                                      <button className="btn">Archive</button>
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
                    )}

                    {filterStat == 'all'&&(
                       applicationData
                       .map(job => (
                         <tr key={job.id} className='p-2  w-full align-center hover'>
                           <td>{job.jobPost.jobTitle}</td>
                           <td>{job.jobPost.company.companyName}</td>
                           <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                           <td><DateConverter isoString={job.dateCreated}/></td>
                           <td>{job.status}</td>
                           <td>
                              <button className="active:bg-info p-1" onClick={()=>document.getElementById(job.id).showModal()}><DeleteOutlinedIcon/></button>

                              <dialog id={job.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-5">Archive Application?</h3>
                                  <p className=" text-md font-semibold">{job.jobPost.jobTitle}</p>
                                  <p className=" text-md">{job.jobPost.company.companyName}</p>
                                  <div className="modal-action ">
                                    <form method="dialog">
                                      {/* if there is a button in form, it will close the modal */}
                                      <button className="btn">Archive</button>
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
                    )}  
                      
                      
                    </tbody>
                </table>
            </div>
        </div>


      </div>
    </div>
  )
}

export default ApplicationDashboard