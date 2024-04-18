import React from "react";
import { useState } from "react";
import TopBar from "../../components/topbar";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [streetAddress, setStreetAdd] = useState("");
  const [cityName, setCityName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [industry, setIndustry] = useState("");
  const [profPic, setProfPic] = useState("");
  const [secRegistration, setSecRegistration] = useState("");
  const [dtiRegistration, setDtiRegistration] = useState("");
  const [businessPermit, setBusinessPermit] = useState("");

  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData();
    if (profPic) {
      formData.append("profPic", profPic);
    }
    if (secRegistration) {
      formData.append("secRegistration", secRegistration);
    }
    if (dtiRegistration) {
      formData.append("dtiRegistration", dtiRegistration);
    }
    if (businessPermit) {
      formData.append("businessPermit", businessPermit);
    }

    // Append article data to the formData
    // Append values to formData
    formData.append("companyName", companyName);
    formData.append("companySize", companySize);
    formData.append("industry", industry);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("streetAddress", streetAddress);
    formData.append("cityName", cityName);
    formData.append("zipCode", zipCode);
    formData.append("countryName", countryName);
    formData.append("emailAddress", emailAddress);
    formData.append("contactNum", phoneNumber);
    formData.append("biography", bio);

    //   for (const value of formData.values()) {
    //     console.log(value);
    //   }

    // const data = new URLSearchParams();

    // for (const pair of formData.values()) {
    //   data.append(pair[0], pair[1]);
    // }
    try {
      // Send the article data to your server
      const response = await fetch("http://localhost:3000/company/create", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }else(
        navigate("/login")
      )

      
    } catch (error) {
      // setIsSubmitting(false);
      console.error("Error creating person:", error);
    }
  };

  const handleProfPicChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setProfPic(null);
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }

    // Check the file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      // setToastMessage("Please upload an image in JPG or PNG format.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      // setToastMessage("File size should be less than 3 MB.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // If file is valid, update the image state and set image preview URL
    setProfPic(file);
  };

  const handleRemoveProfPic = () => {
    setProfPic("");
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  const handleSecPicChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setSecRegistration(null);
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }

    // Check the file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      // setToastMessage("Please upload an image in JPG or PNG format.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      // setToastMessage("File size should be less than 3 MB.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // If file is valid, update the image state and set image preview URL
    setSecRegistration(file);
  };

  const handleRemoveSecPic = () => {
    setSecRegistration("");
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  const handleDtiPicChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setDtiRegistration(null);
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }

    // Check the file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      // setToastMessage("Please upload an image in JPG or PNG format.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      // setToastMessage("File size should be less than 3 MB.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // If file is valid, update the image state and set image preview URL
    setDtiRegistration(file);
  };

  const handleRemoveDtiPic = () => {
    setDtiRegistration("");
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  const handleBusPermitChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setBusinessPermit(null);
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }

    // Check the file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      // setToastMessage("Please upload an image in JPG or PNG format.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      // setToastMessage("File size should be less than 3 MB.");
      // setShowToast(true);
      // setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // If file is valid, update the image state and set image preview URL
    setBusinessPermit(file);
  };

  const handleRemoveBusPermitPic = () => {
    setBusinessPermit("");
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
      <TopBar />
      <form className="w-2/3" onSubmit={handleSubmit}>
        <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Company Name</span>
            </div>
          </label>
          <input
            type="text"
            id="Company Name"
            placeholder="Company Name"
            className="input input-bordered w-full "
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold">Username</span>
                </div>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="input input-bordered w-full "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold">Password</span>
                </div>
              </label>
              <input
                type="text"
                id="password"
                placeholder="Password"
                className="input input-bordered w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Address</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-2 w-full">
            <input
              type="text"
              id="streetAddress"
              placeholder="House #, Street Name"
              className="input input-bordered w-full col-span-2"
              value={streetAddress}
              onChange={(e) => setStreetAdd(e.target.value)}
            />
            <input
              type="text"
              id="cityName"
              placeholder="City Name"
              className="input input-bordered w-full "
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <input
              type="text"
              id="zipCode"
              placeholder="Zip Code"
              className="input input-bordered w-full"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <input
              type="text"
              id="countryName"
              placeholder="Country Name"
              className="input input-bordered w-full col-span-2"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold">Industry</span>
                </div>
              </label>
              <input
                type="text"
                id="industry"
                placeholder="Industry"
                className="input input-bordered w-full "
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold">Company Size</span>
                </div>
              </label>
              <input
                type="text"
                id="companysize"
                placeholder="Company Size"
                className="input input-bordered w-full"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              />
            </div>
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Contact</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-2 w-full">
            <input
              type="text"
              id="emailAddress"
              placeholder="Email Address"
              className="input input-bordered w-full "
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold">Company Logo</span>
                </div>
              </label>
              {!profPic && (
                <input
                  type="file"
                  id="profilePicture"
                  className="file-input file-input-bordered w-full max-w-xs"
                  onChange={handleProfPicChange}
                />
              )}
              {profPic && (
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-32 h-32">
                    <img
                      className="w-full h-full object-contain rounded-full"
                      src={`http://localhost:3000/uploads/profPic/${profPic}`}
                    />
                  </div>

                  <button
                    onClick={handleRemoveProfPic}
                    className="btn btn-info w-fit text-white ml-3"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Brief Description</span>
            </div>
          </label>
          <textarea
            id="bio"
            placeholder="Bio"
            className="textarea textarea-bordered textarea-md w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <div className="flex flex-col mt-8 w-full items-center">
            <span className="text-lg font-bold">Verification Requirements</span>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Business Permit</span>
              </div>
            </label>
            {/* <input type="file" id="validId" className="file-input file-input-bordered w-full" /> */}
            {!businessPermit && (
              <input
                type="file"
                id="businessPermit"
                className="file-input file-input-bordered w-full"
                onChange={handleBusPermitChange}
              />
            )}
            {businessPermit && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={`http://localhost:3000/uploads/profPic/${businessPermit}`}
                  />
                </div>

                <button
                  onClick={handleRemoveBusPermitPic}
                  className="btn btn-info w-fit text-white ml-3"
                >Remove</button>
              </div>
            )}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">DTI Registration</span>
              </div>
            </label>
            {!dtiRegistration && (
              <input
                type="file"
                id="businessPermit"
                className="file-input file-input-bordered w-full"
                onChange={handleDtiPicChange}
              />
            )}
            {dtiRegistration && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={`http://localhost:3000/uploads/profPic/${dtiRegistration}`}
                  />
                </div>

                <button
                  onClick={handleRemoveDtiPic}
                  className="btn btn-info w-fit text-white ml-3"
                >Remove</button>
              </div>
            )}

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">SEC Registration</span>
              </div>
            </label>
            {!secRegistration && (
              <input
                type="file"
                id="businessPermit"
                className="file-input file-input-bordered w-full"
                onChange={handleSecPicChange}
              />
            )}
            {secRegistration && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={`http://localhost:3000/uploads/profPic/${secRegistration}`}
                  />
                </div>

                <button
                  onClick={handleRemoveSecPic}
                  className="btn btn-info w-fit text-white ml-3"
                >Remove</button>
              </div>
            )}
          </div>

          <button type="submit" className={`btn btn-primary w-40 mt-5`}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;
