import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import DateTime from "react-datetime";
import DateToWords from "../../components/DateFormatter";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const EditExperience = ({ expData, fetchExperience }) => {
  const [expId, setExpId] = useState(expData.id);
  const [jobTitle, setJobTitle] = useState(expData.jobTitle);
  const [companyName, setCompanyName] = useState(expData.companyName);
  const [jobDetails, setJobDetails] = useState(expData.jobDetails);
  const [startDate, setStartDate] = useState(expData.startDate);
  const [endDate, setEndDate] = useState(expData.endDate);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const formData = new FormData();

    const isoStartDate =
      startDate instanceof Date && startDate !== ""
        ? startDate.toISOString()
        : startDate;
    const isoEndDate =
      endDate instanceof Date && endDate !== ""
        ? endDate.toISOString()
        : endDate;

    {
      console.log(isoEndDate);
    }
    formData.append("expId", expId);
    formData.append("jobTitle", jobTitle);
    formData.append("companyName", companyName);
    formData.append("jobDetails", jobDetails);
    formData.append("startDate", isoStartDate);
    formData.append("endDate", isoEndDate);

    try {
      const response = await fetch("http://localhost:3000/experience/update", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      fetchExperience();
    } catch (error) {
      console.error("Error creating education:", error);
    }
  };

  const handleStartDateChange = (startDate) => {
    const start = new Date(startDate);
    setStartDate(start);
  };

  // Function to handle changes in the date-time value for end date
  const handleEndDateChange = (endDate) => {
    const end = new Date(endDate);
    setEndDate(end);
  };

  const handleButtonClick = (event) => {
    handleSubmit();
  };
  return (
    <dialog id={expData.id} className="modal">
      <div className="modal-box max-w-2xl mt-10  bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          {/* <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl"> */}
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
              className="textarea textarea-bordered textarea-md h-52 w-full"
              value={jobDetails}
              onChange={(e) => setJobDetails(e.target.value)}
              required
            />
            <div className="flex flex-row w-full gap-2">
              <div className="flex flex-col w-full items-center bg-white rounded-md">
                <DatePicker
                  id="startdate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  isClearable
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="input outline-none focus:outline-none focus-within:outline-none focus-within:border-none bg-white text-center"
                />
              </div>

              <div className="flex flex-col w-full items-center bg-white rounded-md">
                <DatePicker
                  id="enddate"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  isClearable
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="leave blank if current"
                  dropdownMode="select"
                  className="input outline-none focus:outline-none focus-within:outline-none focus-within:border-none bg-white text-center"
                />
              </div>
            </div>
          </div>

          {/* </div> */}
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              type="submit"
              className={`btn btn-primary w-40 mt-5`}
              onClick={handleButtonClick}
            >
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

export default EditExperience;
