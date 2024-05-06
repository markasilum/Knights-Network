import React, { useEffect } from "react";
import TopBar from "./topbar";
import { useState } from "react";
import TopBarGuest from "./TopBarGuest";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
const CreatePersonForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [maidenLastName, setMaidenLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);
  const [streetAddress, setStreetAdd] = useState("");
  const [cityName, setCityName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [previewImageId, setPreviewImageId] = useState("");
  const [role, setRole] = useState("alumni");
  const [errors, setErrors] = useState({});

  const createObjectURL = (file, setterFunction) => {
    if (!file) return setterFunction(undefined);
    const objectUrl = URL.createObjectURL(file);
    setterFunction(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };
  useEffect(() => createObjectURL(image, setPreviewImage), [image]);
  useEffect(() => createObjectURL(imageId, setPreviewImageId), [imageId]);

  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();
    setErrors({})
    const errors = {};

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      setErrors(errors);
    } else {
      const formData = new FormData();
      if (image) {
        formData.append("profPic", image);
      }
      if (imageId) {
        formData.append("idPhoto", imageId);
      }

      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("maidenLastName", maidenLastName);
      formData.append("suffix", suffix);
      formData.append("birthdate", birthDate.toISOString());
      formData.append("username", username);
      formData.append("password", password);
      formData.append("streetAddress", streetAddress);
      formData.append("cityName", cityName);
      formData.append("zipCode", zipCode);
      formData.append("countryName", countryName);
      formData.append("emailAddress", emailAddress);
      formData.append("contactNum", phoneNumber);
      formData.append("biography", bio);
      formData.append("role", role);

      try {
        const response = await fetch("http://localhost:3000/person/create", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error);
        }

        navigate("/login");
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
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setImage(null);
      setImagePreviewUrl(null); // Clear the image preview URL
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
  };

  const handleRemoveImage = () => {
    setImage(null);
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  const handleFileChangeId = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setImageId(null);
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
    setImageId(file);
  };

  const handleRemoveImageId = () => {
    setImageId(null);
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
      {/* <TopBar/> */}
      <TopBarGuest />

      <form onSubmit={handleSubmit} className="w-2/3">
        <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl">
        
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex flex-col">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">First Name*</span>
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
                  <span className="label-text font-normal">Middle Name*</span>
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
                  <span className="label-text font-normal">Last Name*</span>
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
                  <span className="label-text font-normal">Suffix</span>
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
            <div className="col-span-2">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Maiden Name</span>
                </div>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Optional"
                className="input input-bordered w-full "
                value={maidenLastName}
                onChange={(e) => setMaidenLastName(e.target.value)}
              />
            </div>
            
            <div className="w-full ">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">
                    Profile Picture
                  </span>
                </div>
              </label>
              {!image && (
                <input
                  type="file"
                  id="profilePicture"
                  className="file-input file-input-bordered w-full "
                  onChange={handleFileChange}
                />
              )}
              {image && (
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="rounded w-36">
                      <img src={previewImage} />
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
          <div className="flex flex-col">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Birthday</span>
                </div>
              </label>

              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date ? new Date(date) : null)}
                dateFormat="MMMM d, yyyy"
                showMonthDropdown
                showYearDropdown
                yearDropdownItemNumber={45}
                scrollableYearDropdown
                placeholderText="mm/dd/yy"
                className="flex flex-row w-full justify-center items-center align-middle input input-bordered bg-white text-center"
              />
            </div>

            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Username*</span>
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
                  <span className="label-text font-normal">Password*</span>
                </div>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="input input-bordered w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
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
                type="email"
                id="emailAddress"
                placeholder="Email Address"
                className="input input-bordered w-full "
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
              {errors.emailAddress && (
                <span className="text-error">{errors.emailAddress}</span>
              )}
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">
                    Contact Number*
                  </span>
                </div>
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              {errors.invalidNumber && (
                <span className="text-error">{errors.invalidNumber}</span>
              )}
            </div>
          </div>

          

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-normal">
                  Student or Alumni
                </span>
              </div>
            </label>

            <div className="flex flex-row gap-10 justify-start items-center ml-5">
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  name="radio-10"
                  id="student"
                  className="radio checked:bg-success"
                  value={"student"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label className="label cursor-pointer">
                  <span className="label-text">Student</span>
                </label>
              </div>

              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  name="radio-10"
                  id="alumni"
                  className="radio checked:bg-success"
                  value={"alumni"}
                  onChange={(e) => setRole(e.target.value)}
                  checked
                />
                <label className="label cursor-pointer">
                  <span className="label-text">Alumni</span>
                </label>
              </div>
            </div>
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Brief Description</span>
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
            <span className="text-lg font-normal">
              Verification Requirements
            </span>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-normal">Valid ID*</span>
              </div>
            </label>
            {!imageId&&(
              <input
              type="file"
              id="validId"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChangeId}
            />
            )}
            {errors.idPic && (
              <span className="text-error  font-normal h-2">
                {errors.idPic}
              </span>
            )}
            {imageId && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={previewImageId}
                  />
                </div>
                <button
                onClick={handleRemoveImageId}
                className="btn btn-error text-white ml-3"
              >
                Remove Image
              </button>
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

export default CreatePersonForm;
