import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from "../../components/topbar";
import { useNavigate } from "react-router-dom";
import TopBarGuest from "../../components/TopBarGuest";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InputFields from "../../components/InputFields";
import ModalValidationError from "../../components/ModalValidationError";

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
  const [previewProfPic, setPreviewProfPic] = useState();
  const [previewSecRegistration, setPreviewSecRegistration] = useState("");
  const [previewDtiRegistration, setPreviewDtiRegistration] = useState("");
  const [previewBusinessPermit, setPreviewBusinessPermit] = useState("");
  const [fName,setFname] = useState("")
  const [midName,setMidName] = useState("")
  const [lastName,setLastName] = useState("")
  const [suffix,setSuffix] = useState("")
  const [personEmail,setPersonEmail] = useState("")
  const [personPhone,setPersonPhone] = useState("")
  const [position,setPosition] = useState("")

  const createObjectURL = (file, setterFunction) => {
    if (!file) return setterFunction(undefined);
    const objectUrl = URL.createObjectURL(file);
    setterFunction(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };
  useEffect(() => createObjectURL(profPic, setPreviewProfPic), [profPic]);
  useEffect( () => createObjectURL(secRegistration, setPreviewSecRegistration),[secRegistration]);
  useEffect(() => createObjectURL(dtiRegistration, setPreviewDtiRegistration),[dtiRegistration]);
  useEffect(() => createObjectURL(businessPermit, setPreviewBusinessPermit),[businessPermit]);
  
  const [errors, setErrors] = useState({});

  // Validation function for email format
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    return "";
  };

  // Validation function for password length
  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({})
    const errors = {};
    // errors.emailAddress = validateEmail(emailAddress); // Add email validation
    // errors.password = validatePassword(password);

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      setErrors(errors);
    } else {
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

      formData.append("companyName", companyName);
      formData.append("companySize", companySize);
      formData.append("industryName", industry);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("streetAddress", streetAddress);
      formData.append("cityName", cityName);
      formData.append("zipCode", zipCode);
      formData.append("countryName", countryName);
      formData.append("emailAddress", emailAddress);
      formData.append("contactNum", phoneNumber);
      formData.append("biography", bio);

      formData.append("firstName", fName);
      formData.append("middleName", midName);
      formData.append("lastName", lastName);
      formData.append("suffix", suffix);
      formData.append("personEmail", personEmail);
      formData.append("personPhone", personPhone);
      formData.append("positionName", position);

      try {
        // Send the article data to your server
        const response = await fetch("http://localhost:3000/company/create", {
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
        console.log(error.message)
        if (error.message == "Username already taken") {
          setErrors({ username: "Username already taken" });
        } else if (error.message == "Email already taken") {
          setErrors({ emailAddress: "Email already taken" });
        } else if (error.message == "Username and Email are already taken") {
          setErrors({
            username: "Username already taken",
            emailAddress: "Email already taken",
          });
        }else if(error.message === "SEC Registration is required"){
          setErrors({
            secError: "SEC Registration is required",
          })
        }else if(error.message === "DTI Registration is required"){
          setErrors({
            dtiError: "DTI Registration is required",
          })
        }else if(error.message === "Business Permit is required"){
          setErrors({
            bpError: "Business Permit is required",
          })
        }else if(error.message === "Please enter a valid Philippine contact number"){
          setErrors({
            invalidNumber: "Please enter a valid Philippine contact number",
          })
        }else if( error.message ===  "Password must be at least 6 characters long"){
          setErrors({
            password: "Password must be at least 6 characters long",
          })
        }else if( error.message ===  "Person Contact invalid phone"){
          setErrors({
            personPhoneError: "Please enter a valid Philippine contact number",
          })
        }
        else{
          setErrors({validation: error.message})
        }
      }
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
      {console.log(errors)}
      <TopBarGuest />
      <form className="w-2/3" onSubmit={handleSubmit}>
        <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Company Name*</span>
            </div>
          </label>
          <input
            type="text"
            id="Company Name"
            placeholder="Company Name"
            className="input input-bordered w-full "
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <div className="flex flex-row w-full gap-3 justify-between">
            <div className="flex flex-col w-1/2">
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
                  required
                  minLength={6}
                />
                {errors.password && (
                  <span className="text-error  font-normal h-2">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-normal">Company Logo</span>
                  </div>
                </label>
                {!profPic && (
                  <input
                    type="file"
                    id="profilePicture"
                    className="file-input file-input-bordered w-full"
                    onChange={handleProfPicChange}
                  />
                )}
                {profPic && (
                  <div className="w-full flex flex-row gap-2 justify-center items-center">
                    <div className="w-36 h-36">
                      <img
                        className="w-full h-full object-contain rounded-lg"
                        src={previewProfPic}
                      />
                    </div>

                    <button
                      onClick={handleRemoveProfPic}
                      className="btn btn-info w-fit text-white ml-3"
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Address*</span>
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
              required
            />
            <input
              type="text"
              id="cityName"
              placeholder="City Name"
              className="input input-bordered w-full "
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
            <input
              type="text"
              id="zipCode"
              placeholder="Zip Code"
              className="input input-bordered w-full"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            <input
              type="text"
              id="countryName"
              placeholder="Country Name"
              className="input input-bordered w-full col-span-2"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-normal">Industry</span>
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
                  <span className="label-text font-normal">Company Size</span>
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

          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex flex-col">
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
                required
              />
              {errors.emailAddress && (
                <span className="text-error">{errors.emailAddress}</span>
              )}
            </div>

            <div>
              <div className="label">
                <span className="label-text font-normal">Contact Number*</span>
              </div>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Contact Number"
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

          <div className="w-full flex flex-col items-center mt-5">
            <span className="text-lg font-normal">Contact Person</span>
            <div className="flex flex-col w-full ">
              <div className="flex flex-row w-full gap-2">
                <InputFields
                  divWid={"w-full"}
                  req={true}
                  id={"contactFname"}
                  labelText={"First Name"}
                  name={"contactFname"}
                  placeholder={"First Name"}
                  onChange={(e) => setFname(e.target.value)}
                  value={fName}
                />
                <InputFields
                  divWid={"w-full"}
                  id={"midName"}
                  labelText={"Middle Name"}
                  name={"midName"}
                  placeholder={"Middle Name"}
                  onChange={(e) => setMidName(e.target.value)}
                  value={midName}
                />
              </div>
              <div className="flex flex-row gap-2">
                <InputFields
                  divWid={"w-full"}
                  req={true}
                  id={"lastName"}
                  labelText={"Last Name"}
                  name={"lastName"}
                  placeholder={"Last Name"}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <InputFields
                  divWid={"w-full"}
                  id={"suffix"}
                  labelText={"Suffix"}
                  name={"suffix"}
                  placeholder={"Suffix"}
                  onChange={(e) => setSuffix(e.target.value)}
                  value={suffix}
                />
              </div>
              <div className="flex flex-row gap-2">
                <div className="w-full">
                  <label
                    className="form-control w-full max-w-xs col-span-2"
                    htmlFor="personEmail"
                  >
                    <div className="label">
                      <span className="label-text font-normal">Email</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    id="personEmail"
                    name="personEmail"
                    placeholder="Email Address"
                    className="input input-bordered w-full "
                    value={personEmail}
                    onChange={(e) => setPersonEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                <InputFields
                  divWid={"w-full"}
                  id={"personPhone"}
                  labelText={"Contact Number"}
                  name={"personPhone"}
                  placeholder={"Contact Number"}
                  onChange={(e) => setPersonPhone(e.target.value)}
                  value={personPhone}
                  req={true}
                />
                {errors.personPhoneError && (
                <span className="text-error">{errors.personPhoneError}</span>
              )}
                </div>
              </div>
              <InputFields
                divWid={"w-full"}
                id={"position"}
                labelText={"Position"}
                name={"position"}
                placeholder={"Position Name"}
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                req={true}
              />
            </div>
          </div>

          <div className="flex flex-col mt-8 w-full items-center">
            <span className="text-lg font-normal">
              Verification Requirements
            </span>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-normal">Business Permit</span>
              </div>
            </label>
            {!businessPermit && (
              <div>
                <input
                type="file"
                id="businessPermit"
                className="file-input file-input-bordered w-full"
                onChange={handleBusPermitChange}
                required
              />
              {errors.bpError && (
                <span className="text-error  font-normal h-2">
                  {errors.bpError}
                </span>
              )}
              </div>
              
            )}
           
            {businessPermit && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={previewBusinessPermit}
                  />
                </div>

                <button
                  onClick={handleRemoveBusPermitPic}
                  className="btn btn-info w-fit text-white ml-3"
                >
                  Remove
                </button>
              </div>
            )}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-normal">DTI Registration</span>
              </div>
            </label>
            {!dtiRegistration && (
              <div>
                <input
                type="file"
                id="businessPermit"
                className="file-input file-input-bordered w-full"
                onChange={handleDtiPicChange}
                required
              />
               {errors.dtiError && (
                <span className="text-error  font-normal h-2">
                  {errors.dtiError}
                </span>
              )}
              </div>
            )}
            {dtiRegistration && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={previewDtiRegistration}
                  />
                </div>

                <button
                  onClick={handleRemoveDtiPic}
                  className="btn btn-info w-fit text-white ml-3"
                >
                  Remove
                </button>
              </div>
            )}

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-normal">SEC Registration</span>
              </div>
            </label>
            {!secRegistration && (
              <div>
                <input
                type="file"
                id="businessPermit"
                className="file-input file-input-bordered w-full"
                onChange={handleSecPicChange}
                required
              />
              {errors.secError && (
                <span className="text-error  font-normal h-2">
                  {errors.secError}
                </span>
              )}
              </div>
              
            )}
            {secRegistration && (
              <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-2/3 h-56 max-h-56">
                  <img
                    className="w-full h-full object-contain "
                    src={previewSecRegistration}
                  />
                </div>

                <button
                  onClick={handleRemoveSecPic}
                  className="btn btn-info w-fit text-white ml-3"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button type="submit" className={`btn btn-primary w-40 mt-5`}>
            Create Account
          </button>

          
        </div>
      </form>
      {errors.validation &&
            document.getElementById("validationerror").showModal()}
          <ModalValidationError
            errorMessage={errors.validation}
            setErrors={setErrors}
          />
    </div>
  );
};

export default CreateCompany;
