import React, { useState } from "react";
import TopBar from "./topbar";

const CertificationsForm = () => {
  const [certName, setCertName] = useState("");
  const [certDetails, setCertDetails] = useState("");
  const [certPhoto, setCertPhoto] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (certPhoto) {
      formData.append("certPhoto", certPhoto);
    }

    formData.append("certName", certName);
    formData.append("certDetails", certDetails);

    try {
      const response = await fetch(
        "http://localhost:3000/certification/create",
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
    <dialog id="add_cert" className="modal">
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
            <input
              type="file"
              id="licensepic"
              placeholder="License Pic"
              className="file-input file-input-bordered w-full col-span-2"
              onChange={handleFileChange}
            />
            {certPhoto && (
              <button
                onClick={handleRemoveImage}
                className="btn btn-error text-white ml-3"
              >
                Remove Image
              </button>
            )}
          </div>
          <button type="submit" className={`btn btn-primary w-40 mt-5`}>
            Add Certification
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CertificationsForm;
