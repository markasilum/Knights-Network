import React from "react";
import DateTime from "react-datetime";
import { useState } from "react";
import TopBar from "./topbar";
import "react-datetime/css/react-datetime.css";
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
    event.preventDefault();

    console.log(startDate)
    
    const formData = new FormData();

    formData.append("schoolName", schoolName);
    formData.append("degree", degree);
    formData.append("qpi", qpi);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("awards", awards);

    try {
      const response = await fetch(
        "http://localhost:3000/createeducation",
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

  const handleStartDateChange = (startDate) => {
    
    const start = startDate.toISOString();
    setStartDate(start);
  };

  // Function to handle changes in the date-time value for end date
  const handleEndDateChange = (endDate) => {
    const end = endDate.toISOString();
    setEndDate(end);
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
      <TopBar />
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Education</span>
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
                dateFormat="YYYY-MM-DD"
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
                dateFormat="YYYY-MM-DD"
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
          <button type="submit" className={`btn btn-primary w-40 mt-5`}>Create Education</button>

        </div>

      </form>
    </div>
  );
};

export default EducationForm;
