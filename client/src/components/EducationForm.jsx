import React from "react";
import DateTime from "react-datetime";
import { useState } from "react";
import TopBar from "./topbar";
import "react-datetime/css/react-datetime.css";

const EducationForm = () => {
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [qpi, setQpi] = useState("");
  const [startDate, setStartDate] = useState("Start Date");
  const [endDate, setEndDate] = useState("End Date");
  const [awards, setAwards] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("schoolName", schoolName);
    formData.append("degree", degree);
    formData.append("qpi", qpi);
    formData.append("starDate", startDate);
    formData.append("endDate", endDate);
    formData.append("awards", awards);

    try {
      const response = await fetch(
        "http://localhost:3000/api/createeducation",
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
      setIsSubmitting(false);
      console.error("Error creating education:", error);
    }
  };

  const handleStartDate = (newStartDate) => {
    const newStart = newStartDate.toISOString().slice(0, 10);
    setStartDate(newStart);
  };
  const handleEndDate = (newEndDate) => {
    const newEnd = newEndDate.toISOString().slice(0, 10);
    setEndDate(newEnd);
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
                value={startDate === "Start Date" ? null : startDate}
                timeFormat={false}
                onChange={handleStartDate}
                inputProps={{
                  placeholder: startDate,
                  className:
                    "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
                }}
              />

              <DateTime
                value={endDate === "End Date" ? null : endDate}
                timeFormat={false}
                onChange={handleEndDate}
                inputProps={{
                  placeholder: endDate,
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
      </form>
    </div>
  );
};

export default EducationForm;
