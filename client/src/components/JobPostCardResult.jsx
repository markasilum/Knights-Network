import React from 'react'
import TopBar from "./topbar";
import SideBar from "./SideBar";
import { Link, useLocation } from 'react-router-dom';
import ButtonNavigator from './ButtonNavigator';
const JobPostCardResult = ({jobData}) => {
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit flex flex-col rounded-xl mb-20 gap-3">
      {jobData.length == 0&&(
          <div className='p-5 bg-neutral rounded-lg'>
          <div >Oops! It seems that your search didn't yield any results. </div>
          <div>Try refining your search terms</div>
        </div>
      )}
      {jobData.map((job) => (
        <Link
          to={`/jobpost/view/${job.id}`}
          key={job.id}
          className="bg-neutral h-fit w-full rounded-lg flex flex-col p-3 hover:bg-info active:bg-neutral"
        >
          <h1 className="font-semibold">{job.jobTitle}</h1>
          <div className={`font-normal hover:underline decoration-1`}>{job.company.companyName}</div>
          <p className="font-thin">{job.jobLoc}</p>

          <div className="mt-3 w-full flex flex-row justify-between items-center">
            <div>
            <h2>Employment Type: <span className="font-thin">{job.employmentType}</span></h2>
            <h2>Work Model: <span className="font-thin">{job.workModel}</span></h2>
            <h2>Number of Positions: <span className="font-thin">{job.numOfPosition}</span></h2>

            </div>
            
          </div>
        </Link>
      ))}
      <div></div>
    </div>
  )
}

export default JobPostCardResult