import React from 'react'
import ButtonNavigator from '../../components/ButtonNavigator'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'

const EventsDashboard = () => {
  return (
     <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar/>

        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
            <div className="pt-5 pr-5 pl-3 overflow-x-auto">
                <table className="table bg-white rounded-xl mb-3">
                    <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Partners</th>
                        <th>Details</th>
                        <th>Date Created</th>
                    </tr>
                    </thead>
                    {/* <tbody>
                        {applicationData.map((job)=>(
                        <tr key={job.id} className='p-2  w-full align-center hover'>
                            <td>{job.jobPost.jobTitle}</td>
                            <td>{job.jobPost.company.companyName}</td>
                            <td><Link className="underline" to={`/jobpostdetails/${job.jobPostId}`}  >View Details</Link></td>
                            <td><DateToWords dateString={job.dateCreated}/></td>
                        </tr>
                        ))}
                    </tbody> */}
                </table>
                <ButtonNavigator text={"New Event"} path={"/createevent"}/>    
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default EventsDashboard