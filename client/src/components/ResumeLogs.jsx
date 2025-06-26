import React, { useEffect, useState } from 'react'
import TopBar from './topbar'
import SideBar from './SideBar'
import { useAuthContext } from '../hooks/useAuthContext'
import DateConverter from './DateConverter'
import { Link } from 'react-router-dom'

const ResumeLogs = () => {
    const[viewerData, setViewerData]= useState([])
    const{user} = useAuthContext()

    const getViewers = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/user/resume/log/view?id=${user.user.id}`,
            {
              headers: {
                credentials: "include",
              },
            }
          );
          const responseData = await response.json()
          setViewerData(responseData)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(()=>{
        getViewers()
      },[])
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
          <div className="pt-2 pr-2 overflow-x-auto">
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white">
                <div className="text-xl w-full border-b-2 border-dashed">Resume Views and Downloads</div>
              <table className="table bg-white rounded-xl">
                <thead>
                  <tr>
                      <th>Viewer</th>
                      <th>Action</th>
                      <th>Date Created</th>
                  </tr>
                </thead>
               
               
                                  
                <tbody>
                  {viewerData&&(
                    viewerData.map((data) => (
                        <tr key={data.id} className=" align-center hover">
                             
                                {data.resumeViewer.person&&(
                                   
                                    <td className='w-fit'> <Link className='underline decoration-0' to={`/profile/person/view/${data.resumeViewer.person.id}`}>{data.resumeViewer.person.firstName} {data.resumeViewer.person.middleName} {data.resumeViewer.person.lastName}</Link></td>
                                )}

                                {data.resumeViewer.company&&(
                                    <td className='w-fit'><Link className='underline decoration-0' to={`/profile/view/${data.resumeViewer.company.id}`}>{data.resumeViewer.company.companyName}</Link></td>
                                )}

                                <td>{data.action}</td>
                                <td><DateConverter isoString={data.dateCreated}/></td>
                            
                          
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeLogs