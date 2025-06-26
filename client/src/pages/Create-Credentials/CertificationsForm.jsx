import React, { useState } from "react";
import TopBar from "../../components/topbar";

const CertificationsForm = ({fetchCerts}) => {
  const [certName, setCertName] = useState("");
  const [certDetails, setCertDetails] = useState("");
  const [certPhoto, setCertPhoto] = useState("");
  const [errors, setErrors] = useState({})
  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
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
          credentials:'include'

        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
      const dialog = document.getElementById("add_cert");
      dialog.close();
      fetchCerts()
      setCertName("")
      setCertDetails("")
      setCertPhoto("")
      document.getElementById("certPic").value = "";
    } catch (error) {
      console.error("Error creating license:", error);
      if(error.message == "Certification name is required"){
        setErrors({certErr:"Certification name is required"})
      }
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
    document.getElementById("certPic").value = "";
  };

  const handleButtonClick = (event) => {
    handleSubmit()
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
          

          <div className="flex flex-col w-full">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-normal">Certification Name</span>
            </div>
          </label>
            <input
              type="text"
              id="certName"
              placeholder="Certification Name"
              className="input input-bordered w-full text-center"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              required
            />
            {errors.certErr && (
                <span className="text-error ml-2  text-xs h-2">
                  {errors.certErr}
                </span>
              )}

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-normal">Certification details</span>
                </div>
              </label>
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
              id="certPic"
              placeholder="License Pic"
              className="file-input file-input-bordered w-full col-span-2"
              onChange={handleFileChange}
            />
            {certPhoto && (
              <button
                onClick={handleRemoveImage}
                className="btn btn-error text-white mt-3 w-fit"
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
            Add Certification
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

export default CertificationsForm;
