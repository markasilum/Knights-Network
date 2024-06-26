import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import TopBar from "./topbar";
import SideBar from "./SideBar";
import { useAuthContext } from "../hooks/useAuthContext";

const EditPersonProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [streetAddress, setStreetAdd] = useState("");
  const [cityName, setCityName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [personId, setPersonId] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [previewProfPic, setPreviewProfPic] = useState();

  const [errors, setErrors] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/details", {
        credentials: "include",
      });
      const result = await response.json();

      setUsername(result.username);
      setStreetAdd(result.streetAddress);
      setCityName(result.cityName);
      setZipCode(result.zipCode);
      setCountryName(result.countryName);
      setEmailAddress(result.emailAddress);
      setPhoneNumber(result.contactNum);
      setBio(result.biography);
      setImage(result.profPic);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchPersonData = async () => {
    try {
      const response = await fetch("http://localhost:3000/person/details", {
        credentials: "include",
      });
      const result = await response.json();
      setFirstName(result.firstName);
      setMiddleName(result.middleName);
      setLastName(result.lastName);
      setSuffix(result.suffix);
      setPersonId(result.id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    
    fetchUserData();
    fetchPersonData();
  }, []);


  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();
    setErrors({})
    const errors = {};

    const formData = new FormData();
    if (image) {
      formData.append("profPic", image);
    }

    // Append article data to the formData
    // Append values to formData
    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("lastName", lastName);
    formData.append("suffix", suffix);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("streetAddress", streetAddress);
    formData.append("cityName", cityName);
    formData.append("zipCode", zipCode);
    formData.append("countryName", countryName);
    formData.append("emailAddress", emailAddress);
    formData.append("contactNum", phoneNumber);
    formData.append("biography", bio);
    formData.append("personId", personId);

    try {
      // Send the article data to your server
      const response = await fetch("http://localhost:3000/person/update", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const responseData = await response.json();

      if(!response.ok){
        throw new Error(responseData.error);
      }

      const userData = await fetch(`http://localhost:3000/auth/user`, {
        credentials: "include",
      });

      const user = await userData.json();
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }

      navigate("/profile");
    } catch (error) {
      if (error.message == "Username already taken") {
        setErrors({ username: "Username already taken" });
      } else if (error.message == "Email already taken") {
        // setErrors(errors.emailAddress = "Email already taken")
        setErrors({ emailAddress: "Email already taken" });
      } else if (error.message == "Username and Email are already taken") {
        setErrors({
          username: "Username already taken",
          emailAddress: "Email already taken",
        });
      }else if(error.message === "Verification requirement is required"){
        setErrors({
          idPic: "Verification requirement is required",
        })
      }else if(error.message === "Please enter a valid Philippine contact number"){
        setErrors({
          invalidNumber: "Please enter a valid Philippine contact number",
        })
      }else if( error.message ===  "Password must be at least 6 characters long"){
        setErrors({
          password: "Password must be at least 6 characters long",
        })
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setImage(null);
      setPreviewProfPic(null); // Clear the image preview URL
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
    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewProfPic(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleRemoveImage = () => {
    setImage(null);
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className=" overflow-auto mb-20">
            <div className="w-full bg-white flex flex-col">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col bg-neutral p-5">
                  <span className="w-full border-b-2 mb-2 text-end">
                    Edit Account
                  </span>

                  <div className="w-full grid grid-cols-2 gap-2">
                    <div>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Profile Picture
                          </span>
                        </div>
                      </label>

                      <div className="flex flex-row">
                        {!image && (
                          <input
                            type="file"
                            id="profilePicture"
                            className="file-input file-input-bordered w-full max-w-xs"
                            onChange={handleFileChange}
                          />
                        )}

                        {image && !previewProfPic && (
                          <div className="flex flex-row items-center">
                            <div className="avatar">
                              <div className="w-24 rounded">
                                <img
                                  src={`http://localhost:3000/uploads/profPic/${image}`}
                                />
                              </div>
                            </div>
                            <button
                              onClick={handleRemoveImage}
                              className="btn btn-info btn-sm text-white ml-3"
                            >
                              Remove Image
                            </button>
                          </div>
                        )}

                        {image && previewProfPic && (
                          <div className="flex flex-row items-center">
                            <div className="avatar">
                              <div className="w-24 rounded">
                                <img src={previewProfPic} />
                              </div>
                            </div>
                            <button
                              onClick={handleRemoveImage}
                              className="btn btn-info btn-sm text-white ml-3"
                            >
                              Remove Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="flex flex-col">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            First Name*
                          </span>
                        </div>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Firstname"
                        className="input input-bordered w-full "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Middle Name*
                          </span>
                        </div>
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        placeholder="Middle Name"
                        className="input input-bordered w-full"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Last Name*
                          </span>
                        </div>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        className="input input-bordered w-full "
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Suffix
                          </span>
                        </div>
                      </label>
                      <input
                        type="text"
                        id="suffix"
                        placeholder="Suffix"
                        className="input input-bordered w-full"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                      />
                    </div>
                 
                    <div>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Username*
                          </span>
                        </div>
                      </label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="input input-bordered w-full "
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      {errors.username && (
                        <span className="text-error  font-normal h-2">
                          {errors.username}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Password*
                          </span>
                        </div>
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                        className="input input-bordered w-full placeholder-black focus:placeholder-opacity-0 placeholder-opacity-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                      />
                       {errors.password && (
                        <span className="text-error  font-normal h-2">
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </div>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-normal">Address</span>
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
                      <span className="label-text font-normal">Email Address*</span>
                    </div>
                  </label>
                    <input
                      type="text"
                      id="emailAddress"
                      placeholder="Email Address"
                      className="input input-bordered w-full "
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    {errors.emailAddress && (
                      <span className="text-error">{errors.emailAddress}</span>
                    )}
                  </div>
                  <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-normal">Contact Number*</span>
                    </div>
                  </label>
                  <input
                      type="text"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      className="input input-bordered w-full"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.invalidNumber && (
                      <span className="text-error">{errors.invalidNumber}</span>
                    )}
                  </div>
                    
                  </div>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-normal">
                        Brief Description
                      </span>
                    </div>
                  </label>
                  <textarea
                    id="bio"
                    placeholder="Bio"
                    className="textarea textarea-bordered textarea-md w-full"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>

                  <div className="w-full flex justify-end">
                  <button type="submit" className={`btn btn-primary w-40 mt-5`}>
                    Update Account
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPersonProfile;
