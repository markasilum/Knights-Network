import React from 'react'
import { useState } from 'react';
import TopBar from '../../components/topbar';
import InputFields from '../../components/InputFields';
import TextAreaInput from '../../components/TextAreaInput';

const CreateJobPost = () => {
const [companyName, setCompanyName] = useState('');
const [jobTitle, setJobTitle] = useState('');
const [jobDesc, setJobDesc] = useState('');
const [employmentType, setEmploymentType] = useState('');
const [salary, setSalary] = useState('');
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
const [isAppLetterReq, setIsAppLetterReq] = useState('  ');
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
            <InputFields id={"jobtitle"} placeholder={"Job Title"} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
            <div className='col-span-2'>
            <TextAreaInput id={"jobdesc"} placeholder={"Job Description"} value={jobDesc} onChange={(e)=> setJobDesc(e.target.value)}/>
            </div>
            <InputFields id={"employmentType"} placeholder={"Employment Type"} value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
            <InputFields id={"salary"} placeholder={"Salary"} value={salary} onChange={(e) => setSalary(e.target.value)} />
            <InputFields id={"jobLoc"} placeholder={"Job Location"} value={jobLoc} onChange={(e) => setJobLoc(e.target.value)} />
            <InputFields id={"workModel"} placeholder={"Work Model"} value={workModel} onChange={(e) => setWorkModel(e.target.value)} />
            <InputFields id={"numOfPosition"} placeholder={"Number of Positions"} value={numOfPosition} onChange={(e) => setNumOfPosition(e.target.value)} />
            
            <InputFields id={"degree"} placeholder={"Degree"} value={degree} onChange={(e) => setDegree(e.target.value)} />
            <InputFields id={"yearsExp"} placeholder={"Years of Experience"} value={yearsExp} onChange={(e) => setYearExp(e.target.value)} />
            <InputFields id={"licenseName"} placeholder={"License Name"} value={licenseName} onChange={(e) => setLicenseName(e.target.value)} />
            <InputFields id={"certification"} placeholder={"Certification"} value={certification} onChange={(e) => setCertification(e.target.value)} />
            <InputFields id={"skill"} placeholder={"Skill"} value={skill} onChange={(e) => setSkill(e.target.value)} />
            <InputFields id={"isAppLetterReq"} placeholder={"Application Letter Required"} value={isAppLetterReq} onChange={(e) => setIsAppLetterReq(e.target.checked)} />
        
            
            
            <button type="submit" className={`btn btn-primary w-40`}>Test</button>

        </div>
        </form>
        

    </div>
  )
}

export default CreateJobPost