import React from 'react'
import { useState } from 'react';
import TopBar from './topbar'

const EditPersonProfile = (userId) => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [cityName, setCityName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [countryName, setCountryName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
  
    const handleSubmit = async (event) => {
      // setIsSubmitting(true);
      event.preventDefault();
  
      const formData = new FormData();
    
      // Append article data to the formData
      // Append values to formData
        formData.append('firstName', firstName);
        formData.append('middleName', middleName);
        formData.append('lastName', lastName);
        formData.append('suffix', suffix);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('houseNumber', houseNumber);
        formData.append('street', street);
        formData.append('cityName', cityName);
        formData.append('zipCode', zipCode);
        formData.append('countryName', countryName);
        formData.append('emailAddress', emailAddress);
        formData.append('contactNum', phoneNumber);
        formData.append('biography', bio);
       
  
        for (const value of formData.values()) {
          console.log(value);
        }
  
        // const data = new URLSearchParams();
        
        // for (const pair of formData.values()) {
        //   data.append(pair[0], pair[1]);
        // }
      try {
        // Send the article data to your server
        const response = await fetch('http://localhost:3000/api/persons', {
          method: 'POST',
          body: formData
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.error);
        }
       
  
        const newArticleId = responseData.id; 
  
       
      } catch (error) {
        setIsSubmitting(false);
        console.error('Error creating person:', error);
      }
    };
   
    return (
      <div className='w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto'>
        <TopBar/>
  
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl'>
            <span>Edit Account</span>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Name</span>
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
              <span className="label-text font-bold">Username</span>
            </div>
          </label>
          <input type="text" id="username" placeholder="Username" className="input input-bordered w-full " value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Password</span>
            </div>
          </label>
          <input type="text" id="password" placeholder="Password" className="input input-bordered w-full " value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
  
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Address</span>
            </div>
          </label>
        
        <div className='grid grid-cols-2 gap-2 w-full'>
          <input type="text" id="houseNumber" placeholder="House #" className="input input-bordered w-full " value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
          <input type="text" id="street" placeholder="Street" className="input input-bordered w-full" value={street} onChange={(e) => setStreet(e.target.value)} />
          <input type="text" id="cityName" placeholder="City Name" className="input input-bordered w-full " value={cityName} onChange={(e) => setCityName(e.target.value)} />
          <input type="text" id="zipCode" placeholder="Zip Code" className="input input-bordered w-full" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          <input type="text" id="countryName" placeholder="Country Name" className="input input-bordered w-full col-span-2" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
        </div>
        
  
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Contact</span>
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
              <span className="label-text font-bold">Profile Picture</span>
            </div>
          </label>
            <input type="file" id="profilePicture" className="file-input file-input-bordered w-full max-w-xs" />
          </div>
          
          <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Student or Alumni</span>
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
          </div>
        </div>
  
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Brief Description</span>
            </div>
          </label>
        <textarea id="bio" placeholder="Bio" className="textarea textarea-bordered textarea-md w-full" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
  
        <div className='flex flex-col mt-8 w-full items-center'>
          <span className='text-lg font-bold'>Verification Requirements</span>
          <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Valid ID</span>
              </div>
            </label>
          <input type="file" id="validId" className="file-input file-input-bordered w-full" />
        </div>
  
        <button type="submit" className={`btn btn-primary w-40 mt-5`}>Create Account</button>
  
        </div>
      </form>
  
        
  
  
      </div>
     
    )
}

export default EditPersonProfile