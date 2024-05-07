import React, { useRef } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const EditEducation = ({educationData, fetchEducation}) => {
  const [id, setId] = useState(educationData.id);
  const [schoolName, setSchoolName] = useState(educationData.schoolName);
  const [degree, setDegree] = useState(educationData.degree.degreeName);
  const [qpi, setQpi] = useState(educationData.qpi);
  const [startDate, setStartDate] = useState(educationData.startDate);
  const [endDate, setEndDate] = useState(educationData.endDate);
  const [awards, setAwards] = useState(educationData.awards);
  const [educData, setEducData] = useState(educationData);
  const[errors, setErrors] = useState({})

  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    const isoStartDate =
    startDate instanceof Date && startDate !== ""
      ? startDate.toISOString()
      : startDate;
  const isoEndDate =
    endDate instanceof Date && endDate !== ""
      ? endDate.toISOString()
      : endDate;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("schoolName", schoolName);
    formData.append("degree", degree);
    formData.append("qpi", qpi);
    formData.append("startDate", isoStartDate);
    formData.append("endDate", isoEndDate);
    formData.append("awards", awards);

    try {
      const response = await fetch("http://localhost:3000/education/update", {
        method: "PUT",
        body: formData,
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      const dialog = document.getElementById(educData.id);
      dialog.close();
      
      fetchEducation()
    } catch (error) {
      console.error("Error creating education:", error);
      if(error.message == "School Name is required"){
        setErrors({schoolErr:"School Name is required"})
      }else if(error.message == "Start date is required"){
        setErrors({startErr:"Start date is required"})
      }
      else if(error.message == "Degree is required"){
        setErrors({degreeErr:"Degree is required"})
      }
    }
  };

  const handleStartDateChange = (startDate) => {
    // console.log(startDate);
    const start = startDate.toISOString();
    // console.log(start);
    setStartDate(start);
  };

  // Function to handle changes in the date-time value for end date
  const handleEndDateChange = (endDate) => {
    const end = endDate.toISOString();
    setEndDate(end);
  };

  const handleButtonClick = (event) => {
    handleSubmit()
  };

  return (
    <dialog id={educData.id} className="modal">
      <div className="modal-box max-w-2xl bg-base-200 overflow-scroll">
        <form  method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Edit Education</span>
            </div>
          </label>
          <div className="flex flex-col w-full">
            <div className="flex-flex-col">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-normal">School Name</span>
                </div>
              </label>
              <input
                type="text"
                id="schoolName"
                placeholder="University"
                className="input input-bordered w-full text-center"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />
              {errors.schoolErr && (
                <span className="text-error ml-2  text-xs h-2">
                  {errors.schoolErr}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Degree Name</span>
                </div>
              </label>
              <input
                type="text"
                id="degree"
                placeholder="Degree"
                className="input input-bordered w-full text-center"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
               {errors.degreeErr && (
                <span className="text-error  ml-2 text-xs h-2">
                  {errors.degreeErr}
                </span>
              )}
            </div>

            <div className="flex flex-col">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Degree Name</span>
                </div>
              </label>
            <input
              type="text"
              id="qpi"
              placeholder="Cumulative QPI"
              className="input input-bordered w-full text-center"
              value={qpi}
              onChange={(e) => setQpi(e.target.value)}
            />
            </div>
            <div className="flex flex-row w-full gap-3">
              <div className="flex flex-col w-full">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-normal">Start Date</span>
                  </div>
                </label>
                <div className="flex flex-col w-full items-center justify-center bg-white rounded-md input input-bordered">
                  <DatePicker
                    id="startdate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="mm/dd/yy"
                    dropdownMode="select"
                    className=" outline-none focus:outline-none focus-within:outline-none focus-within:border-none bg-white text-center"
                  />
                </div>
                {errors.startErr && (
                  <span className="text-error  text-xs h-2">
                    {errors.startErr}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-normal">End Date</span>
                  </div>
                </label>
                <div className="flex flex-col w-full items-center justify-center bg-white rounded-md input input-bordered">
                  <DatePicker
                    id="enddate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    isClearable
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="or expected end date"
                    dropdownMode="select"
                    className=" outline-none focus:outline-none focus-within:outline-none focus-within:border-none bg-white text-center"
                  />
                </div>
              </div>
            </div>

           <div className="flex flex-col">
           <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-normal">Awards</span>
                </div>
              </label>
            <input
              type="text"
              id="awards"
              placeholder="Awards"
              className="input input-bordered w-full text-center"
              value={awards}
              onChange={(e) => setAwards(e.target.value)}
            />
           </div>
          </div>
          <div className="flex flex-row justify-center border-b-2 border-dashed border-info mt-4"></div>
          <button type="submit" className={`btn btn-primary w-40 mt-5`} onClick={handleSubmit}>
              Update
            </button>
        </form>
        
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditEducation;