import React from 'react'
import { useState } from 'react';
import TopBar from '../../components/topbar';
import InputFields from '../../components/InputFields';

const CreateJobPost = () => {
const [companyName, setCompanyName] = useState('');
const [jobTitle, setJobTitle] = useState('');
const [jobDesc, setJobDesc] = useState('');
const [employmentType, setEmploymentType] = useState('');
const [salary, setSalary] = useState(0);
const [jobLoc, setJobLoc] = useState('');
const [workModel, setWorkModel] = useState('');
const [numOfPosition, setNumOfPosition] = useState('');
const [validity, setValidity] = useState(new Date().toISOString());
const [isOpen, setIsOpen] = useState(true);
const [degree, setDegree] = useState('');
const [yearsExp, setYearExp] = useState('');
const [licenseName, setLicenseName] = useState('');
const [certification, setCertification] = useState('');
const [skill, setSkill] = useState([]);
const [isAppLetterReq, setIsAppLetterReq] = useState(false);
const [dateCreated, setDateCreated] = useState(new Date().toISOString());
const [dateUpdated, setDateUpdated] = useState(new Date().toISOString());


  return (
    <div className='w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto'>
        <TopBar/>

        <form className='w-2/3'>
        <div className='grid grid-cols-2 bg-base-200 shadow-xl p-10 mt-5 rounded-xl gap-3'>
            <label className="form-control w-full max-w-xs col-span-2">
                <div className="label">
                    <span className="label-text font-bold">Job Details</span>
                </div>
            </label>
            <InputFields placeholder={"Company Name"} id={"companyname"} value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
            <InputFields placeholder={"Job Title"} id={"jobtitle"} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>

            <button type="submit" className={`btn btn-primary w-40`}>Test</button>

        </div>
        </form>
        

    </div>
  )
}

export default CreateJobPost