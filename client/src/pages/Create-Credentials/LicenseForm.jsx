import React from "react";
import DateTime from "react-datetime";
import { useState } from "react";
import TopBar from "../../components/topbar";
import "react-datetime/css/react-datetime.css";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const LicenseForm = ({fetchLicense}) => {
  const [licenseName, setLicenseName] = useState("");
  const [licensePic, setLicensePic] = useState("");
  const [licenseValidity, setLicenseValidity] = useState(null);
  const [errors, setErrors]= useState({})
  const handleSubmit = async (event) => {

    event.preventDefault()
    setErrors({})
    const isoStartDate =
    licenseValidity instanceof Date && licenseValidity !== ""
      ? licenseValidity.toISOString()
      : licenseValidity;

    const formData = new FormData();

    if (licensePic) {
      formData.append("licensePic", licensePic);
    }

    if(isoStartDate){
      formData.append("licenseValidity", isoStartDate);
    }

    formData.append("licenseName", licenseName);

    try {
      const response = await fetch("http://localhost:3000/license/create", {
        method: "POST",
        body: formData,
        credentials:'include'

      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      const dialog = document.getElementById("add_license");
      dialog.close();


      fetchLicense()
      setLicenseName("")
      setLicensePic("")
      setLicenseValidity(null)
    } catch (error) {
      console.error("Error creating license:", error);
    }
  };

  const handleDateChange = (startDate) => {
    console.log(startDate);
    const start = startDate.toISOString();
    console.log(start);
    setLicenseValidity(start);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setLicensePic(null);
      // setImagePreviewUrl(null); // Clear the image preview URL
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }

    // Check the file type
    // const validTypes = ['image/jpeg', 'image/png'];
    // if (!validTypes.includes(file.type)) {
    //   setToastMessage('Please upload an image in JPG or PNG format.');
    //   setShowToast(true);
    //   setTimeout(() => setShowToast(false), 3000);
    //   resetFileInput();
    //   return;
    // }

    // Check the file size (3 MB in bytes)
    // const maxSize = 3 * 1024 * 1024;
    // if (file.size > maxSize) {
    //   setToastMessage('File size should be less than 3 MB.');
    //   setShowToast(true);
    //   setTimeout(() => setShowToast(false), 3000);
    //   resetFileInput();
    //   return;
    // }

    // If file is valid, update the image state and set image preview URL
    setLicensePic(file);
  };

  const handleRemoveImage = () => {
    setLicensePic(null);
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  const handleButtonClick = (event) => {
    handleSubmit()
  };
  return (
    <dialog id="add_license" className="modal">
      <div className="modal-box max-w-2xl bg-base-200 overflow-scroll">
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
              <span className="label-text font-bold">Add License</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">License Name</span>
                </div>
              </label>
              <input
                type="text"
                id="licenseName"
                placeholder="License Name"
                className="input input-bordered w-full text-center"
                value={licenseName}
                onChange={(e) => setLicenseName(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Expires on:</span>
                </div>
              </label>
              <div className="flex flex-col w-full items-center justify-center bg-white rounded-md input input-bordered">
                <DatePicker
                  id="startdate"
                  selected={licenseValidity}
                  onChange={(date) => setLicenseValidity(date)}
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
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">License Pic <span className="text-xs">[optional]</span></span>
              </div>
            </label>
            <input
              type="file"
              id="licensepic"
              placeholder="License Pic"
              className="file-input file-input-bordered w-full col-span-2"
              onChange={handleFileChange}
            />
            {licensePic && (
              <button
                onClick={handleRemoveImage}
                className="btn btn-error text-white ml-3"
              >
                Remove Image
              </button>
            )}
          </div>

          <div className="w-full flex justify-end">
          <button
              type="submit"
              className={`btn btn-primary w-40 mt-5`}
              onClick={handleSubmit}
            >
              Add License
            </button>
          </div>
        </form>
        
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LicenseForm;
