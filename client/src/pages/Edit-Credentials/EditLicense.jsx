import React, { useState } from 'react'
import DateTime from "react-datetime";
import { useNavigate } from "react-router-dom";

const EditLicense = ({licenseData}) => {
  const[id, setId] = useState(licenseData.id);
  const [licenseName, setLicenseName] = useState(licenseData.licenseName);
  const [licensePic, setLicensePic] = useState(licenseData.licensePic);
  const [licenseValidity, setLicenseValidity] = useState(licenseData.licenseValidity);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    
    const formData = new FormData();

    if (licensePic) {
      formData.append("licensePic", licensePic);
    }
    formData.append("licId", id);
    formData.append("licenseName", licenseName);
    formData.append("licenseValidity", licenseValidity);

    try {
        
      const response = await fetch("http://localhost:3000/license/update", {
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
  return (
    <dialog id={licenseData.id} className="modal">
      <div className="modal-box max-w-2xl bg-base-200">
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
                <span className="label-text font-bold">Edit License</span>
              </div>
            </label>

            <div className="grid grid-cols-2 gap-2 w-full">
              <input
                type="text"
                id="licenseName"
                placeholder="License Name"
                className="input input-bordered w-full text-center"
                value={licenseName}
                onChange={(e) => setLicenseName(e.target.value)}
              />

              <DateTime
                className="mb-3"
                id="startdate"
                dateFormat="MM-YYYY"
                selected={licenseValidity}
                value={licenseValidity.slice(0,7)}
                timeFormat={false}
                onChange={handleDateChange}
                inputProps={{
                  placeholder: "License Validity",
                  className:
                    "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center",
                }}
              />
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">License Pic</span>
                </div>
              </label>
              {!licensePic &&(
                <input
                type="file"
                id="licensepic"
                placeholder="License Pic"
                className="file-input file-input-bordered w-full col-span-2"
                onChange={handleFileChange}
              />
              
              )}
              {
                licensePic &&(
                   <div className='col-span-2 flex flex-row items-center'>
                         <img className='col-span-2 max-w-96' src={`http://localhost:3000/uploads/licensePic/${licenseData.licensePic}`}/>
                         
                         <button onClick={handleRemoveImage} className="btn btn-error text-white ml-3 w-48">Remove Image</button>
                   </div>
                )
              }
             
            </div>
            <button type="submit" className={`btn btn-primary w-40 mt-5`}>
              Update License
            </button>
          {/* </div> */}
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default EditLicense