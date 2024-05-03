import React from 'react'
import { useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate 
} from "react-router-dom";

import TopBar from './topbar'
import SideBar from './SideBar';

const EditPersonProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [streetAddress, setStreetAdd] = useState('');
    const [cityName, setCityName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [countryName, setCountryName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [personId, setPersonId] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('http://localhost:3000/user/details',{
              credentials:'include'
            });
            const result = await response.json();

                setUsername(result.username);
                setStreetAdd(result.streetAddress)
                setCityName(result.cityName);
                setZipCode(result.zipCode);
                setCountryName(result.countryName);
                setEmailAddress(result.emailAddress);
                setPhoneNumber(result.contactNum);
                setBio(result.biography);
                setImage(result.profPic);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        const fetchPersonData = async () => {
          try {
            const response = await fetch('http://localhost:3000/person/details',{
              credentials:'include'
            });
            const result = await response.json();
            setFirstName(result.firstName);
            setMiddleName(result.middleName);
            setLastName(result.lastName);
            setSuffix(result.suffix);
            setPersonId(result.id)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

      fetchUserData();
      fetchPersonData();
     
    }, []);
  
  
    const handleSubmit = async (event) => {
      // setIsSubmitting(true);
      event.preventDefault();
  
      const formData = new FormData();
      if (image) {
        formData.append('profPic', image);
      }
    
      // Append article data to the formData
      // Append values to formData
        formData.append('firstName', firstName);
        formData.append('middleName', middleName);
        formData.append('lastName', lastName);
        formData.append('suffix', suffix);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('streetAddress', streetAddress);
        formData.append('cityName', cityName);
        formData.append('zipCode', zipCode);
        formData.append('countryName', countryName);
        formData.append('emailAddress', emailAddress);
        formData.append('contactNum', phoneNumber);
        formData.append('biography', bio);
        formData.append('personId', personId);
       
  
        for (const value of formData.values()) {
          console.log(value);
        }
  
        // const data = new URLSearchParams();
        
        // for (const pair of formData.values()) {
        //   data.append(pair[0], pair[1]);
        // }
      try {
        // Send the article data to your server
        const response = await fetch('http://localhost:3000/person/update', {
          method: 'PUT',
          body: formData,
          credentials:'include'
        });

      navigate("/profile")
      
      } catch (error) {
        setIsSubmitting(false);
        console.error('Error creating person:', error);
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
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setToastMessage('Please upload an image in JPG or PNG format.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        resetFileInput();
        return;
      }
    
      // Check the file size (3 MB in bytes)
      const maxSize = 3 * 1024 * 1024;
      if (file.size > maxSize) {
        setToastMessage('File size should be less than 3 MB.');
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
      document.getElementById('fileInput').value = "";
    };
  
    return (
      <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className=" overflow-auto mb-20">
            <div className="w-full bg-white flex flex-col">
        
        <form onSubmit={handleSubmit} className='w-full'>
        <div className='flex flex-col bg-neutral p-5'>
            <span>Edit Account</span>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Name</span>
            </div>
          </label>
        
        <div className='grid grid-cols-2 gap-2 w-full'>
          <input type="text" id="firstName" placeholder="Firstname" className="input input-bordered w-full " value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" id="middleName" placeholder="Middle Name" className="input input-bordered w-full" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          <input type="text" id="lastName" placeholder="Last Name" className="input input-bordered w-full " value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="text" id="suffix" placeholder="Suffix" className="input input-bordered w-full" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
        </div>
  
        <div className='grid grid-cols-2 gap-2 w-full'>
          <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Username</span>
            </div>
          </label>
          <input type="text" id="username" placeholder="Username" className="input input-bordered w-full " value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Password</span>
            </div>
          </label>
          <input type="password" id="password" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;" className="input input-bordered w-full placeholder-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
  
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Address</span>
            </div>
          </label>
        
        <div className='grid grid-cols-2 gap-2 w-full'>
          <input type="text" id="streetAddress" placeholder="House #, Street Name" className="input input-bordered w-full col-span-2" value={streetAddress} onChange={(e) => setStreetAdd(e.target.value)} />
          <input type="text" id="cityName" placeholder="City Name" className="input input-bordered w-full " value={cityName} onChange={(e) => setCityName(e.target.value)} />
          <input type="text" id="zipCode" placeholder="Zip Code" className="input input-bordered w-full" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          <input type="text" id="countryName" placeholder="Country Name" className="input input-bordered w-full col-span-2" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
        </div>
        
  
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Contact</span>
            </div>
          </label>
        
        <div className='grid grid-cols-2 gap-2 w-full'>
          <input type="text" id="emailAddress" placeholder="Email Address" className="input input-bordered w-full " value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          <input type="text" id="phoneNumber" placeholder="Phone Number" className="input input-bordered w-full" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
  
  
       
        <div className='w-full grid grid-cols-2 gap-2'>
          <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Profile Picture</span>
            </div>
          </label>
            <input type="file" id="profilePicture" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange}/>
            {image && (
                <button onClick={handleRemoveImage} className="btn btn-error text-white ml-3">
                  Remove Image
                </button>
              )}
          </div>
          
          {/* <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Student or Alumni</span>
            </div>
          </label>
            
            <div className='flex flex-row justify-center gap-10 items-center'>   
                <div className='flex flex-row items-center'>
                <input type="radio" name="radio-10" id="student" className="radio checked:bg-success" checked />
                  <label className="label cursor-pointer">
                      <span className="label-text">Student</span> 
                  </label>
                </div> 
  
                <div className='flex flex-row items-center'>
                <input type="radio" name="radio-10" id="alumni" className="radio checked:bg-success" checked />
                <label className="label cursor-pointer">
                      <span className="label-text">Alumni</span> 
                  </label>
                  </div>  
            </div>
          </div> */}
        </div>
  
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-normal">Brief Description</span>
            </div>
          </label>
        <textarea id="bio" placeholder="Bio" className="textarea textarea-bordered textarea-md w-full" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
  
        <button type="submit" className={`btn btn-primary w-40 mt-5`}>Update Account</button>
  
        </div>
      </form>
  
        
  
  
      </div>
      </div>
      </div>
      </div>
      </div>

     
    )
}

export default EditPersonProfile