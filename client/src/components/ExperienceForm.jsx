import React from "react";
import DateTime from "react-datetime";
import { useState } from "react";
import TopBar from "./topbar";
import "react-datetime/css/react-datetime.css";
import { useEffect } from "react";
const ExperienceForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [userData, setUserData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(startDate)
    
    const formData = new FormData();

    formData.append("jobTitle", jobTitle);
    formData.append("companyName", companyName);
    formData.append("jobDetails", jobDetails);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    try {
      const response = await fetch(
        "http://localhost:3000/createexperience",
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
    console.log(startDate)
    const start = startDate.toISOString();
    console.log(start)
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
              <span className="label-text font-bold">Work Experience</span>
            </div>
          </label>

          <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 gap-3">
          <input
              type="text"
              id="jobtitle"
              placeholder="Job Title"
              className="input input-bordered w-full text-center"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              type="text"
              id="companyname"
              placeholder="Company Name"
              className="input input-bordered w-full text-center"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

          </div>
            
            <textarea
              type="text"
              id="jobdetails"
              placeholder="Job Details"
              className="textarea textarea-bordered textarea-md w-full"
              value={jobDetails}
              onChange={(e) => setJobDetails(e.target.value)}
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
            
          </div>
          <button type="submit" className={`btn btn-primary w-40 mt-5`}>Create Experience</button>

        </div>

      </form>
    </div>
  )
}

export default ExperienceForm