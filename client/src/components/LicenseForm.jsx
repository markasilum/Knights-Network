import React from "react";
import DateTime from "react-datetime";
import { useState } from "react";
import TopBar from "./topbar";
import "react-datetime/css/react-datetime.css";
import { useEffect } from "react";

const LicenseForm = () => {
  const [licenseName, setLicenseName] = useState("");
  const [licensePic, setLicensePic] = useState("");
  const [licenseValidity, setLicenseValidity] = useState(
    new Date().toISOString()
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(startDate);

    const formData = new FormData();

    formData.append("licenseName", licenseName);
    formData.append("licensePic", licensePic);
    formData.append("licenseValidity", licenseValidity);

    try {
      const response = await fetch("http://localhost:3000/createlicense", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.error("Error creating education:", error);
    }
  };

  const handleDateChange = (startDate) => {
    console.log(startDate);
    const start = startDate.toISOString();
    console.log(start);
    setLicenseValidity(start);
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
      <TopBar />
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">License</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-2 w-full">
            <input
              type="text"
              id="licenseName"
              placeholder="License Name"
              className="input input-bordered w-full text-center"
              value={licenseName}
              onChange={(e) => setSchoolName(e.target.value)}
            />

            <DateTime
              id="startdate"
              dateFormat="YYYY-MM"
              selected={licenseValidity}
              timeFormat={false}
              onChange={handleDateChange}
              inputProps={{
                placeholder: "License Validity",
                className:
                  "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
              }}
            /><label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">License Pic</span>
            </div>
          </label>
            <input
              type="file"
              id="licensepic"
              placeholder="License Pic"
              className="file-input file-input-bordered w-full col-span-2"
              value={licensePic}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <button type="submit" className={`btn btn-primary w-40 mt-5`}>
            Add License
          </button>
        </div>
      </form>
    </div>
  );
};

export default LicenseForm;
