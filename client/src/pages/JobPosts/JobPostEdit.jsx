import React from "react";

const JobPostEdit = () => {
  return (
    <dialog id={eventData.id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl mt-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
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
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default JobPostEdit;
