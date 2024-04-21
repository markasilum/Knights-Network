import React from "react";
import { useState, useEffect } from "react";
import TopBar from "../../components/topbar";
import { useNavigate } from "react-router-dom";

const EditCompanyProfile = () => {
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
  const [profPic, setProfPic] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/details");
        const result = await response.json();

        setUsername(result.username);
        setPassword(result.password);
        setStreetAdd(result.streetAddress);
        setCityName(result.cityName);
        setZipCode(result.zipCode);
        setCountryName(result.countryName);
        setEmailAddress(result.emailAddress);
        setPhoneNumber(result.contactNum);
        setProfPic(result.profPic);
        setBio(result.biography);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("http://localhost:3000/company/details");
        const result = await response.json();
        setCompanyName(result.companyName);
        setCompanySize(result.companySize);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
    fetchCompanyData();
  }, []);

  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData();

    // Append article data to the formData
    // Append values to formData
    if (profPic) {
      formData.append("profPic", profPic);
    }
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
      const response = await fetch("http://localhost:3000/company/update", {
        method: "PUT",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
      navigate("/profile");
    } catch (error) {
      console.error("Error updating person:", error);
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
      setToastMessage("Please upload an image in JPG or PNG format.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      setToastMessage("File size should be less than 3 MB.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Company Logo</span>
            </div>
          </label>

          <div className="w-full flex flex-row items-center">
            {!profPic && (
              <input
                type="file"
                id="profilePicture"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleProfPicChange}
              />
            )}
            {profPic && (
              
                
                  <div className="w-32 h-32">
                    <img
                    className="w-full h-full object-contain rounded-full"
                      src={`http://localhost:3000/uploads/profPic/${profPic}`}
                    />
                  </div>
                
         
            )}
            {profPic && (
              <button
                onClick={handleRemoveProfPic}
                className="btn btn-info w-fit text-white ml-3"
              >
                Remove Image
              </button>
            )}
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

         

          <button type="submit" className={`btn btn-primary w-40 mt-5`}>
            Update Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyProfile;
