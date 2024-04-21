import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditCerts = ({certData}) => {
    const [certName, setCertName] = useState(certData.certName);
    const [certDetails, setCertDetails] = useState(certData.certDetails);
    const [certPhoto, setCertPhoto] = useState(certData.certPhoto);
    const [certId, setCertId] = useState(certData.id);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
  
      const formData = new FormData();
  
      if (certPhoto) {
        formData.append("certPhoto", certPhoto);
      }
      formData.append("certId", certId);
      formData.append("certName", certName);
      formData.append("certDetails", certDetails);
  
      try {
        const response = await fetch(
          "http://localhost:3000/certification/update",
          {
            method: "PUT",
            body: formData,
          }
        );
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.error);
        }

        navigate(0)
      } catch (error) {
        console.error("Error creating license:", error);
      }
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      // Function to reset file input
      const resetFileInput = () => {
        event.target.value = null; // This clears the selected file
        setCertPhoto(null);
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
      setCertPhoto(file);
    };
  
    const handleRemoveImage = () => {
      setCertPhoto(null);
      // Resetting the file input if needed
      document.getElementById("fileInput").value = "";
    };
  
    return (
      <dialog id={certId} className="modal">
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
                <span className="label-text font-bold">Certification</span>
              </div>
            </label>
  
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                id="certName"
                placeholder="Certification Name"
                className="input input-bordered w-full text-center"
                value={certName}
                onChange={(e) => setCertName(e.target.value)}
              />
              <textarea
                type="text"
                id="certDetails"
                placeholder="Details"
                className="input input-bordered w-full h-28"
                value={certDetails}
                onChange={(e) => setCertDetails(e.target.value)}
              />
  
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Certification Photo</span>
                </div>
              </label>
              
              {!certPhoto &&(
                <input
                type="file"
                id="certPhoto"
                placeholder="Certification Photo"
                className="file-input file-input-bordered w-full col-span-2"
                onChange={handleFileChange}
              />
              
              )}
              {
                certPhoto &&(
                   <div className='col-span-2 flex flex-row items-center'>
                         <img className='col-span-2 max-w-96' src={`http://localhost:3000/uploads/certPhoto/${certPhoto}`}/>
                         
                         <button onClick={handleRemoveImage} className="btn btn-error text-white ml-3 w-48">Remove Image</button>
                   </div>
                )
              }
            </div>
            <button type="submit" className={`btn btn-primary w-40 mt-5`}>
              Update
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
}

export default EditCerts