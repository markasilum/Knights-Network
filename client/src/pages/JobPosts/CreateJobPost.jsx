import React, { useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../../components/topbar';
import InputFields from '../../components/InputFields';
import TextAreaInput from '../../components/TextAreaInput';
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
const CreateJobPost = () => {
  const navigate = useNavigate();

const [jobTitle, setJobTitle] = useState('');
const [jobDesc, setJobDesc] = useState('');
const [employmentType, setEmploymentType] = useState('');
const [salary, setSalary] = useState('');
const [jobLoc, setJobLoc] = useState('');
const [workModel, setWorkModel] = useState('');
const [numOfPosition, setNumOfPosition] = useState('');
const [validity, setValidity] = useState(new Date().toISOString());
const [isOpen, setIsOpen] = useState(true);
const [yearsExp, setYearExp] = useState('');
const [degree, setDegree] = useState([{degreeName:""}]);
const [licenseName, setLicenseName] = useState([{licenseName:""}]);
const [skills, setSkill] = useState([{skillName:""}]);
const [isAppLetterReq, setIsAppLetterReq] = useState(false);
const [dateCreated, setDateCreated] = useState(new Date().toISOString());
const [dateUpdated, setDateUpdated] = useState(new Date().toISOString());

// useEffect(()=>{console.log(isAppLetterReq)})

const handleAddSkill = () => {
  setSkill([...skills,{skillName:""}]);
};

const handleAddLicense = () => {
  setLicenseName([...licenseName,{licenseName:""}]);
};

const handleAddDegree = () => {
  setDegree([...degree,{degreeName:""}]);
};

const handleChange = (event, index) => {
  event.preventDefault();
  let { name, value } = event.target;
  let onChangeValue = [...skills];
  onChangeValue[index].skillName = value;
  setSkill(onChangeValue);
};

const handleChangeLicense = (event, index) => {
  event.preventDefault();
  let { name, value } = event.target;
  let onChangeValue = [...licenseName];
  onChangeValue[index].licenseName = value;
  setLicenseName(onChangeValue);
};
const handleChangeDegree = (event, index) => {
  event.preventDefault();
  let { name, value } = event.target;
  let onChangeValue = [...degree];
  onChangeValue[index].degreeName = value;
  setDegree(onChangeValue);
};

const handleDeleteInput = (index) => {
  const newArray = [...skills];
  newArray.splice(index, 1);
  setSkill(newArray);
};

const handleDeleteInputLicense = (index) => {
  const newArray = [...licenseName];
  newArray.splice(index, 1);
  setLicenseName(newArray);
};

const handleDeleteInputDegree = (index) => {
  const newArray = [...degree];
  newArray.splice(index, 1);
  setDegree(newArray);
};

const handleCheckboxChange = () => {
  // Toggle the boolean value when checkbox is clicked
  setIsAppLetterReq(!isAppLetterReq);
};

const navigateHome = () => {
  // 👇️ navigate to /
  navigate('/home');
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  
  const formData = new FormData();

  formData.append('jobTitle', jobTitle);
  formData.append('jobDesc', jobDesc);
  formData.append('employmentType', employmentType);
  formData.append('salary', salary);
  formData.append('jobLoc', jobLoc);
  formData.append('workModel', workModel);
  formData.append('numOfPosition', numOfPosition);
  formData.append('validity', validity);
  formData.append('isOpen', isOpen);
  // formData.append('degree', degree);
  formData.append('yearsExp', yearsExp);
  formData.append('isAppLetterReq', isAppLetterReq);


  degree.forEach((item, index) => {
    formData.append(`degree[${index}][degreeName]`, item.degreeName);
  });
  skills.forEach((item, index) => {
    formData.append(`skill[${index}][skillName]`, item.skillName);
  });
  licenseName.forEach((item, index) => {
    formData.append(`license[${index}][licenseName]`, item.licenseName);
  });
  
  // console.log("Form Data");
  // for (let sk of skills) {
  //   console.log(sk);
  //   }
    

  try {
    const response = await fetch(
      "http://localhost:3000/jobpost/create",
      {
        method: "POST",
        body: formData,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error);
    }else{
      navigateHome()
    }
  } catch (error) {
    console.error("Error creating job post:", error);
  }
};

const handleValidity = (endDate) => {
  const end = endDate.toISOString();
  setValidity(end);
};
  return (
    <div className='w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto'>
        <TopBar/>

        <form className='w-2/3' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 bg-base-200 shadow-xl p-10 mt-5 mb-5 rounded-xl gap-2'>
            <h1 className='col-span-2 text-center font-medium border-b-2 border-info'>Job Creation Form</h1>
            <div className='col-span-2'>
            <InputFields id={"jobtitle"} labelText={"Job Title"} placeholder={"ex: Jr. React Developer"} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
            <TextAreaInput id={"jobdesc"} labelText={"Job Description"} placeholder={"Job Description"} value={jobDesc} onChange={(e)=> setJobDesc(e.target.value)}/>
            </div>
            <InputFields id={"employmentType"} labelText={"Employment Type"} placeholder={"ex: Full-time"} value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
            <InputFields id={"salary"} labelText={"Salary"} placeholder={"ex: PHP 50,000"} value={salary} onChange={(e) => setSalary(e.target.value)} />
            <InputFields id={"jobLoc"} labelText={"Job Location"} placeholder={"ex: Davao City"} value={jobLoc} onChange={(e) => setJobLoc(e.target.value)} />
            <InputFields id={"workModel"} labelText={"Work Model"} placeholder={"ex: Work From Home"} value={workModel} onChange={(e) => setWorkModel(e.target.value)} />
            <InputFields id={"numOfPosition"} labelText={"Number of Positions"} placeholder={"ex: 3"} value={numOfPosition} onChange={(e) => setNumOfPosition(e.target.value)} />
            <div className='col-span-2'>
                 <span className="label-text font-bold">Qualifications</span>
            </div>
            {/* <InputFields id={"degree"} labelText={"Degree"} placeholder={"ex: BS Information Technology"} value={degree} onChange={(e) => setDegree(e.target.value)} /> */}
            <InputFields id={"yearsExp"} labelText={"Years of Experience"} placeholder={"ex: 2 years of experience"} value={yearsExp} onChange={(e) => setYearExp(e.target.value)} />

            <div className='col-span-2'>
                 <span className="label-text">Degree</span>
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              
              {degree.map((item, index) => (
              
                <div className="grid grid-cols-4 gap-3 place-items-center" key={index}>
                  
                  <input type="text" id={"certification"} className="input input-bordered w-full col-span-2" name={"certification"} value={item.degreeName} placeholder={"ex: BS Information Technology"} onChange={(event) => handleChangeDegree(event, index)}/>

                  {index === degree.length - 1 && (
                    <button className={`btn btn-success btn-sm text-white w-full `} onClick={() => handleAddDegree()}>Add</button>
                  )}

                  {degree.length > 1 && (
                    <button className={`btn btn-info btn-sm text-white items-center w-full`} onClick={() => handleDeleteInputDegree(index)}>Delete</button>
                  )}
                  
                </div>
              
              ))}
              

            </div>
            
            <div className='col-span-2'>
                 <span className="label-text">Skills</span>
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              
              {skills.map((item, index) => (
              
                <div className="grid grid-cols-4 gap-3 place-items-center" key={index}>
                  
                  <input type="text" id={"skill"} className="input input-bordered w-full col-span-2" name={"skill"} value={item.skillName} placeholder={"ex: Project Management"} onChange={(event) => handleChange(event, index)}/>

                  {index === skills.length - 1 && (
                    <button className={`btn btn-success  btn-sm text-white w-full `} onClick={() => handleAddSkill()}>Add</button>
                  )}

                  {skills.length > 1 && (
                    <button className={`btn btn-info btn-sm text-white items-center w-full`} onClick={() => handleDeleteInput(index)}>Delete</button>
                  )}
                  {/* {console.log(index)} */}
                </div>
              
              ))}
              

            </div>

            <div className='col-span-2'>
                 <span className="label-text">License</span>
            </div>
            
            <div className='col-span-2 flex flex-col gap-2'>
              {licenseName.map((item, index) => (
              
                <div className="grid grid-cols-4 gap-3 place-items-center" key={index}>
                  
                  <input type="text" id={"license"} className="input input-bordered w-full col-span-2" name={"license"} value={item.licenseName} placeholder={"ex: Chemical Engineer"} onChange={(event) => handleChangeLicense(event, index)}/>

                  {index === licenseName.length - 1 && (
                    <button className={`btn btn-success  btn-sm text-white w-full`} onClick={() => handleAddLicense()}>Add</button>
                  )}

                  {licenseName.length > 1 && (
                    <button className={`btn btn-info btn-sm text-white items-center w-full`} onClick={() => handleDeleteInputLicense(index)}>Delete</button>
                  )}
                  {/* {console.log(item.skillName)} */}
                </div>
              
              ))}
            </div>


            
            <div className="flex flex-row gap-5 mt-3">
                <span className="label-text font-bold">Require Application Letter?</span> 
                <input type="checkbox" className="toggle toggle-success"  checked={isAppLetterReq}  onChange={handleCheckboxChange}/>
            </div>
            <div className='col-span-2'>
                 <span className="label-text">Validity</span>
            </div>
            <DateTime
                id="isOpen"
                selected={validity}
                timeFormat={false}
                onChange={handleValidity}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                inputProps={{
                  placeholder: "Open Until",
                  className:
                    "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
                }}
              />
           
        
            
            
            <button type="submit" className={`btn btn-primary w-40 mt-10 col-span-2`}>Create Job</button>

        </div>
        </form>
        

    </div>
  )
}

export default CreateJobPost