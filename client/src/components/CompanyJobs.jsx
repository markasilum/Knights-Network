import React, { useEffect, useState } from 'react'
import ButtonPrimary from './ButtonPrimary'
import ButtonNavigator from './ButtonNavigator'
import { Link } from 'react-router-dom'

const CompanyJobs = ({jobData, companyData}) => {
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit mt-3 p-5 flex flex-col rounded-xl mb-20 gap-2'>
        {jobData.map((job)=>(
          <Link className="" to={`/jobpostdetails/${job.id}`}  >
            <div key={job.id} className='bg-neutral h-fit w-full rounded-lg flex flex-col p-3 hover:bg-info active:bg-neutral'>
              <span className='font-semibold'>{job.jobTitle}</span>
              <span className='font-normal'>{companyData.companyName}</span>
              <span className='font-thin'>{job.jobLoc}</span>

          </div>
          </Link>
          
        ))}
        <div >
            

        </div>    

    <ButtonNavigator text={"New Job"} path={"/createjobpost"}/>    
    </div>

  )
}

export default CompanyJobs