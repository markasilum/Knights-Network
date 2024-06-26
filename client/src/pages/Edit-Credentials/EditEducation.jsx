import React, { useRef } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditEducation = ({educationData, degreeData}) => {
  const [id, setId] = useState(educationData.id);
  const [schoolName, setSchoolName] = useState(educationData.schoolName);
  const [degree, setDegree] = useState(educationData.degree.degreeName);
  const [qpi, setQpi] = useState(educationData.qpi);
  const [startDate, setStartDate] = useState(educationData.startDate);
  const [endDate, setEndDate] = useState(educationData.endDate);
  const [awards, setAwards] = useState(educationData.awards);
  const [educData, setEducData] = useState(educationData);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("schoolName", schoolName);
    formData.append("degree", degree);
    formData.append("qpi", qpi);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("awards", awards);
    console.log("called submit form")

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
      
      navigate(0)
    } catch (error) {
      console.error("Error creating education:", error);
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
        <form onSubmit={handleSubmit} method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Edit Education</span>
            </div>
          </label>
          <div className="flex flex-col gap-3">
            <div key={educData.id} className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-center border-b-2 border-dashed border-info mb-2"></div>
              <input
                type="text"
                id="schoolName"
                placeholder="University"
                className="input input-bordered w-full text-center"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />

              <input
                type="text"
                id="degree"
                placeholder="Degree"
                className="input input-bordered w-full text-center"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />

              <input
                type="text"
                id="qpi"
                placeholder="Cumulative QPI"
                className="input input-bordered w-full text-center"
                value={qpi}
                onChange={(e) => setQpi(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <DateTime
                  id="startdate"
                  dateFormat="MM-YYYY"
                  selected={startDate}
                  timeFormat={false}
                  value={educData.startDate}
                  onChange={handleStartDateChange}
                  inputProps={{
                    placeholder: "Start Date",
                    className:
                      "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
                  }}
                />

                <DateTime
                  id="enddate"
                  dateFormat="MM-YYYY"
                  selected={endDate}
                  timeFormat={false}
                  value={educData.endDate}
                  onChange={handleEndDateChange}
                  inputProps={{
                    placeholder: "End date: month/year",
                    className:
                      "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
                  }}
                />
              </div>
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
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className={`btn btn-primary w-40 mt-5`} onClick={handleButtonClick}>
              Update
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditEducation;