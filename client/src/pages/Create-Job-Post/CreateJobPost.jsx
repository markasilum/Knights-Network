import React, { useEffect } from 'react'
import { useState } from 'react';
import TopBar from '../../components/topbar';
import InputFields from '../../components/InputFields';
import TextAreaInput from '../../components/TextAreaInput';
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
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
const [licenseName, setLicenseName] = useState([{licenseName:""}]);
const [certification, setCertification] = useState([{certName:""}]);
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

const handleAddCert = () => {
  setCertification([...certification,{certName:""}]);
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
const handleChangeCert = (event, index) => {
  event.preventDefault();
  let { name, value } = event.target;
  let onChangeValue = [...certification];
  onChangeValue[index].certName = value;
  setCertification(onChangeValue);
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

const handleDeleteInputCert = (index) => {
  const newArray = [...certification];
  newArray.splice(index, 1);
  setCertification(newArray);
};

const handleCheckboxChange = () => {
  // Toggle the boolean value when checkbox is clicked
  setIsAppLetterReq(!isAppLetterReq);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  
  const formData = new FormData();

  formData.append('companyName', companyName);
  formData.append('jobTitle', jobTitle);
  formData.append('jobDesc', jobDesc);
  formData.append('employmentType', employmentType);
  formData.append('salary', salary);
  formData.append('jobLoc', jobLoc);
  formData.append('workModel', workModel);
  formData.append('numOfPosition', numOfPosition);
  formData.append('validity', validity);
  formData.append('isOpen', isOpen);
  formData.append('degree', degree);
  formData.append('yearsExp', yearsExp);
  formData.append('isAppLetterReq', isAppLetterReq);
  
  skills.forEach((item, index) => {
    formData.append(`skill[${index}][skillName]`, item.skillName);
  });
  licenseName.forEach((item, index) => {
    formData.append(`licenseName[${index}][licenseName]`, item.licenseName);
  });
  certification.forEach((item, index) => {
    formData.append(`certification[${index}][certName]`, item.certName);
  });



  console.log("Form Data");
  for (let obj of formData) {
    console.log(obj);
    }
    

  try {
    const response = await fetch(
      "http://localhost:3000/createjobpost",
      {
        method: "POST",
        body: formData,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error);
    }
  } catch (error) {
    console.error("Error creating education:", error);
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
            <InputFields id={"degree"} labelText={"Degree"} placeholder={"ex: BS Information Technology"} value={degree} onChange={(e) => setDegree(e.target.value)} />
            <InputFields id={"yearsExp"} labelText={"Years of Experience"} placeholder={"ex: 2 years of experience"} value={yearsExp} onChange={(e) => setYearExp(e.target.value)} />
            
            <div className='col-span-2'>
                 <span className="label-text">Skills</span>
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              
              {skills.map((item, index) => (
              
                <div className="grid grid-cols-4 gap-3" key={index}>
                  
                  <input type="text" id={"skill"} className="input input-bordered w-full col-span-2" name={"skill"} value={item.skillName} placeholder={"ex: Project Management"} onChange={(event) => handleChange(event, index)}/>

                  {index === skills.length - 1 && (
                    <button className={`btn btn-success text-white `} onClick={() => handleAddSkill()}>Add</button>
                  )}

                  {skills.length > 1 && (
                    <button className={`btn btn-info text-white`} onClick={() => handleDeleteInput(index)}>Delete</button>
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
              
                <div className="grid grid-cols-4 gap-3" key={index}>
                  
                  <input type="text" id={"license"} className="input input-bordered w-full col-span-2" name={"license"} value={item.licenseName} placeholder={"ex: Chemical Engineer"} onChange={(event) => handleChangeLicense(event, index)}/>

                  {index === licenseName.length - 1 && (
                    <button className={`btn btn-success text-white `} onClick={() => handleAddLicense()}>Add</button>
                  )}

                  {licenseName.length > 1 && (
                    <button className={`btn btn-info text-white`} onClick={() => handleDeleteInputLicense(index)}>Delete</button>
                  )}
                  {/* {console.log(item.skillName)} */}
                </div>
              
              ))}
            </div>


            <div className='col-span-2'>
                 <span className="label-text">Certifications</span>
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              
              {certification.map((item, index) => (
              
                <div className="grid grid-cols-4 gap-3" key={index}>
                  
                  <input type="text" id={"certification"} className="input input-bordered w-full col-span-2" name={"certification"} value={item.certName} placeholder={"ex: CCNA"} onChange={(event) => handleChangeCert(event, index)}/>

                  {index === certification.length - 1 && (
                    <button className={`btn btn-success text-white `} onClick={() => handleAddCert()}>Add</button>
                  )}

                  {certification.length > 1 && (
                    <button className={`btn btn-info text-white`} onClick={() => handleDeleteInputCert(index)}>Delete</button>
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