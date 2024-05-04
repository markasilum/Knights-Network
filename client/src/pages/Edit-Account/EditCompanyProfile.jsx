import React from "react";
import { useState, useEffect } from "react";
import TopBar from "../../components/topbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import SideBar from "../../components/SideBar";
import InputFields from "../../components/InputFields";

const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext()

  const [companyName, setCompanyName] = useState(user.user.company.companyName);
  const [companySize, setCompanySize] = useState(user.user.company.companySize);
  const [username, setUsername] = useState(user.user.username);
  const [password, setPassword] = useState("");
  const [streetAddress, setStreetAdd] = useState(user.user.streetAddress);
  const [cityName, setCityName] = useState(user.user.cityName);
  const [zipCode, setZipCode] = useState(user.user.zipCode);
  const [countryName, setCountryName] = useState(user.user.countryName);
  const [emailAddress, setEmailAddress] = useState(user.user.emailAddress);
  const [phoneNumber, setPhoneNumber] = useState(user.user.contactNum);
  const [bio, setBio] = useState(user.user.biography);
  const [profPic, setProfPic] = useState(user.user.profPic);
  const [industry, setIndustry] = useState(user.user.company.industry.map(item=>item.industry.industryName));
  const [fName,setFname] = useState("")
  const [midName,setMidName] = useState("")
  const [lastName,setLastName] = useState("")
  const [suffix,setSuffix] = useState("")
  const [personEmail,setPersonEmail] = useState("")
  const [personPhone,setPersonPhone] = useState("")
  const [position,setPosition] = useState("")
  const [preview, setPreview] = useState(null);
  const {dispatch} = useAuthContext()
  

  useEffect(()=>{
    const fetchContactData = async () => {
        try {
            const response = await fetch("http://localhost:3000/company/contact",{
              credentials:'include'
            });
            const getRes = await response.json();
            setFname(getRes.person.firstName);
            setMidName(getRes.person.midName)
            setLastName(getRes.person.lastName)
            setSuffix(getRes.person.suffix)
            setPersonEmail(getRes.email)
            setPersonPhone(getRes.phone)
            setPosition(getRes.positionName)

          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }
    fetchContactData()
},[])

  // const previewFunction = async () => {

  // }
  // useEffect(() => {
  //   console.log("profPic:", profPic); // Log the value of profPic
  //   if (!profPic) {
  //     console.log("profPic is empty, setting preview to undefined");
  //     setPreview(undefined);
  //     return;
  //   }
  
  //   console.log("profPic is not empty, creating object URL");
  //   const objectUrl = URL.createObjectURL(profPic);
  //   setPreview(objectUrl);
  
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [profPic]);

  

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
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      const userData = await fetch(`http://localhost:3000/auth/user`, {
            credentials: "include",
        });

          const user = await userData.json();
          if(user){
            dispatch({ type: "LOGIN", payload: user });
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
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleRemoveProfPic = () => {
    setProfPic("");
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
            <div className="w-full bg-white flex flex-col p-3">
              
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col bg-white p-5 rounded-xl">
                <h1 className="col-span-2 text-end font-medium border-b-2 border-dashed border-info">
                    Edit Profile  
                  </h1>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-normal">
                        Company Name
                      </span>
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
                          <span className="label-text font-normal">
                            Username
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
                      />
                    </div>
                    <div>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text font-normal">
                            Password
                          </span>
                        </div>
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                        className="input input-bordered w-full placeholder-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                          <span className="label-text font-normal">
                            Industry
                          </span>
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
                          <span className="label-text font-normal">
                            Company Size
                          </span>
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
                      <span className="label-text font-normal">Contact</span>
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
                      <span className="label-text font-normal">
                        Company Logo
                      </span>
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
                    {profPic && !preview && (
                      <div className="w-32 h-32">
                        <img
                          className="w-full h-full object-contain rounded-md"
                          src={`http://localhost:3000/uploads/profPic/${profPic}`}
                        />
                      </div>
                    )}
                    {profPic && !preview && (
                      <button
                        onClick={handleRemoveProfPic}
                        className="btn btn-info w-fit text-white ml-3"
                      >
                        Remove Image
                      </button>
                    )}

                    {preview && (
                      <div className="w-32 h-32">
                        <img
                          className="w-full h-full object-contain rounded-md"
                          src={preview}
                        />
                      </div>
                    )}
                    {preview && (
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
                  <div className="w-full flex flex-col items-center mt-5">
          <span className="text-lg font-normal">Contact Person</span>
          <div className="flex flex-col w-full ">
            <div className="flex flex-row w-full gap-2">
            <InputFields divWid={'w-full'} id={'contactFname'} labelText={'First Name'} name={"contactFname"} placeholder={'First Name'} onChange={(e) => setFname(e.target.value)} value={fName}/>
            <InputFields divWid={'w-full'} id={'midName'} labelText={'Middle Name'} name={"midName"} placeholder={'Middle Name'} onChange={(e) => setMidName(e.target.value)} value={midName}/>
            </div>
            <div className="flex flex-row gap-2">
            <InputFields divWid={'w-full'} id={'lastName'} labelText={'Last Name'} name={"lastName"} placeholder={'Last Name'} onChange={(e) => setLastName(e.target.value)} value={lastName}/>
            <InputFields divWid={'w-full'} id={'suffix'} labelText={'Suffix'} name={"suffix"} placeholder={'Suffix'} onChange={(e) => setSuffix(e.target.value)} value={suffix}/>
            </div>
            <div className="flex flex-row gap-2">
            <div className='w-full' >
            <label className="form-control w-full max-w-xs col-span-2" htmlFor='personEmail'>
                <div className="label">
                      <span className="label-text font-normal">Email</span>
                  </div>
            </label>
            <input type='email' id='personEmail' name="personEmail" placeholder='Email Address' className="input input-bordered w-full " value={personEmail} onChange={(e) => setPersonEmail(e.target.value)} />
          </div>
            <InputFields divWid={'w-full'} id={'personPhone'} labelText={'Contact Number'} name={"personPhone"} placeholder={'Contact Number'} onChange={(e) => setPersonPhone(e.target.value)} value={personPhone}/>
            </div>
            <InputFields divWid={'w-full'} id={'position'} labelText={'Position'} name={"position"} placeholder={'Position Name'} onChange={(e) => setPosition(e.target.value)} value={position}/>
          </div>
          </div>

                  <button type="submit" className={`btn btn-primary w-40 mt-5`}>
                    Update Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
