import React from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import TopBar from "../../components/topbar";
import { useEffect } from "react";
const EducationForm = () => {
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [qpi, setQpi] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [awards, setAwards] = useState("");
  const [userData, setUserData] = useState([]);

  const handleSubmit = async (event) => {
    // event.preventDefault();

    console.log(startDate);

    const formData = new FormData();

    formData.append("schoolName", schoolName);
    formData.append("degree", degree);
    formData.append("qpi", qpi);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("awards", awards);

    try {
      const response = await fetch("http://localhost:3000/education/create", {
        method: "POST",
        body: formData,
        credentials:'include'

      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.error("Error creating education:", error);
    }
  };

  const handleStartDateChange = (startDate) => {
    console.log(startDate);
    const start = startDate.toISOString();
    console.log(start);
    setStartDate(start);
  };

  // Function to handle changes in the date-time value for end date
  const handleEndDateChange = (endDate) => {
    const end = endDate.toISOString();
    setEndDate(end);
  };

  return (
    <dialog id="add_education" className="modal">
      <div className="modal-box max-w-2xl bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Add Education</span>
            </div>
          </label>

          <div className="flex flex-col gap-2 w-full">
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
                dateFormat="YYYY-MM"
                selected={startDate}
                timeFormat={false}
                onChange={handleStartDateChange}
                inputProps={{
                  placeholder: "Start Date",
                  className:
                    "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
                }}
              />

              <DateTime
                id="enddate"
                dateFormat="YYYY-MM"
                selected={endDate}
                timeFormat={false}
                onChange={handleEndDateChange}
                inputProps={{
                  placeholder: "End Date",
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
          <button type="submit" className={`btn btn-primary w-40 mt-5`}>
            Create Education
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EducationForm;
