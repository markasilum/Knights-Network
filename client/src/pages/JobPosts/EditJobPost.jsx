import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import TopBar from "../../components/topbar";
import InputFields from "../../components/InputFields";
import TextAreaInput from "../../components/TextAreaInput";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";


const EditJobPost = ({ jobData, jobDegree, jobSkills, jobLicense,  fetchJobPostDetails,fetchJobPostDegree,fetchJobPostSkills,fetchJobPostLicense,fetchApplication}) => {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState(jobData?.jobId || '');
  const [jobTitle, setJobTitle] = useState(jobData.jobTitle || '');
  const [jobDesc, setJobDesc] = useState(jobData.jobDesc || '');
  const [employmentType, setEmploymentType] = useState(jobData.employmentType || '');
  const [salary, setSalary] = useState(jobData.salary || '');
  const [jobLoc, setJobLoc] = useState(jobData.jobLoc || '');
  const [workModel, setWorkModel] = useState(jobData.workModel || '');
  const [numOfPosition, setNumOfPosition] = useState(jobData.numOfPosition || '');
  const [validity, setValidity] = useState(jobData.validity || null);
  const [isOpen, setIsOpen] = useState(jobData.isOpen || '');
  const [yearsExp, setYearExp] = useState(jobData.yearsExp || '');
  const [degree, setDegree] = useState([{degreeName:""}] || '');
  const [licenseName, setLicenseName] = useState([{licenseName:""}] || '');
  // const [certification, setCertification] = useState([{certName:""}]);
  const [skills, setSkill] = useState([{skillName:""}] || '');
  const [isAppLetterReq, setIsAppLetterReq] = useState(jobData.isAppLetterReq || '');

  const handleAddSkill = () => {
    setSkill([...skills, { skillName: "" }]);
  };

  const handleAddLicense = () => {
    setLicenseName([...licenseName, { licenseName: "" }]);
  };

  const handleAddDegree = () => {
    setDegree([...degree, { degreeName: "" }]);
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

  const handleDeleteInput = (index,event) => {
    event.preventDefault()
    const newArray = [...skills];
    newArray.splice(index, 1);
    setSkill(newArray);
  };

  const handleDeleteInputLicense = (index) => {
    const newArray = [...licenseName];
    newArray.splice(index, 1);
    setLicenseName(newArray);
  };

  const handleDeleteInputDegree = (index,event) => {
    event.preventDefault()
    const newArray = [...degree];
    newArray.splice(index, 1);
    setDegree(newArray);
  };

  const handleCheckboxChange = () => {
    // Toggle the boolean value when checkbox is clicked
    setIsAppLetterReq(!isAppLetterReq);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault()

    const isoValidityDate =
    validity instanceof Date && validity !== ""
        ? dayjs(validity).format('YYYY-MM-DDTHH:mm:ss[Z]')
        : validity;

    const formData = new FormData();
    formData.append("id", jobId);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDesc", jobDesc);
    formData.append("employmentType", employmentType);
    formData.append("salary", salary);
    formData.append("jobLoc", jobLoc);
    formData.append("workModel", workModel);
    formData.append("numOfPosition", numOfPosition);
    formData.append("validity", isoValidityDate);
    formData.append("isOpen", isOpen);
    // formData.append('degree', degree);
    formData.append("yearsExp", yearsExp);
    formData.append("isAppLetterReq", isAppLetterReq);

    degree.forEach((item, index) => {
      formData.append(`degree[${index}][degreeName]`, item.degreeName);
    });
    skills.forEach((item, index) => {
      formData.append(`skill[${index}][skillName]`, item.skillName);
    });
    licenseName.forEach((item, index) => {
      formData.append(`license[${index}][licenseName]`, item.licenseName);
    });

    try {

      const response = await fetch("http://localhost:3000/jobpost/update", {
        method: "PUT",
        body: formData,
        credentials:'include'
      });

      
      fetchJobPostDetails();
      fetchJobPostDegree();
      fetchJobPostSkills();
      fetchJobPostLicense();
      fetchApplication();
      
      const dialog = document.getElementById(jobData.id);
      dialog.close();

    } catch (error) {
      console.error("Error updating job post:", error);
    }
  };

  const handleValidity = (endDate) => {
    const end = endDate.toISOString();
    setValidity(end);
  };

  useEffect(() => {
    if (jobDegree && jobDegree.length > 0) {
      setDegree(jobDegree.map((degree) => ({ degreeName: degree })));
    }
    if (jobSkills && jobSkills.length > 0) {
      setSkill(jobSkills.map((skill) => ({ skillName: skill })));
    }
    if (jobLicense && jobLicense.length > 0) {
      setLicenseName(jobLicense.map((license) => ({ licenseName: license })));
    }
    if (jobData) {
        setJobId(jobData.id)
        setJobTitle(jobData.jobTitle);
        setJobDesc(jobData.jobDesc);
        setEmploymentType(jobData.employmentType);
        setSalary(jobData.salary);
        setJobLoc(jobData.jobLoc);
        setWorkModel(jobData.workModel);
        setNumOfPosition(jobData.numOfPosition);
        setYearExp(jobData.yearsExp)
        setValidity(jobData.validity);
        setIsOpen(jobData.isOpen);
        setIsAppLetterReq(jobData.isAppLetterReq)
      }
  }, [jobDegree, jobSkills, jobLicense]);

  const handleButtonClick = (event) => {
    handleSubmit()
  };
  return (
    <dialog id={jobData.id} className="modal">
      {/* {console.log(jobLicense)} */}
        {/* {console.log(jobDegree[0].id)} */}
      <div className="modal-box max-w-3xl bg-base-200 overflow-scroll">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
        <form className='w-full' onSubmit={handleSubmit}>
       
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
            <InputFields id={"yearsExp"} labelText={"Years of Experience"} placeholder={"ex: 2 years of experience"} value={yearsExp} onChange={(e) => setYearExp(e.target.value)} />

            <div className='col-span-2'>
                 <span className="label-text">Degree</span>
            </div>
            {/* {console.log(degree)} */}
            <div className='col-span-2 flex flex-col gap-2'>
              
              {degree.map((item, index) => (
              
                <div className="grid grid-cols-4 gap-3 place-items-center" key={index}>
                  
                  <input type="text" id={"certification"} className="input input-bordered w-full col-span-2" name={"certification"} value={item.degreeName} placeholder={"ex: BS Information Technology"} onChange={(event) => handleChangeDegree(event, index)}/>

                  {index === degree.length - 1 && (
                    <button className={`btn btn-success btn-sm text-white w-full `} onClick={() => handleAddDegree()}>Add</button>
                  )}

                  {degree.length >= 1 && (
                    <button className={`btn btn-info btn-sm text-white items-center w-full`} onClick={(e) => handleDeleteInputDegree(index,e)}>Delete</button>
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

                  {skills.length >= 1 && (
                    <button className={`btn btn-info btn-sm text-white items-center w-full`} onClick={(e) => handleDeleteInput(index,e)}>Delete</button>
                  )}
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

                  {licenseName.length >= 1 && (
                    <button className={`btn btn-info btn-sm text-white items-center w-full`} onClick={(e) => handleDeleteInputLicense(index)}>Delete</button>
                  )}
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
            <div className="flex flex-col w-fit items-center bg-white rounded-md">
                <DatePicker
                  id="validity"
                  selected={validity}
                  onChange={(date) => setValidity(date)}
          
                  isClearable
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="input outline-none focus:outline-none focus-within:outline-none focus-within:border-none bg-white text-center"
                />
              </div>
           
            <button type="submit" className={`btn btn-primary w-40 mt-10 col-span-2`} onClick={handleSubmit}>Update Job Post</button>
        </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditJobPost;
