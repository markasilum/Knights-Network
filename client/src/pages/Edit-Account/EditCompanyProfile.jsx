import React from 'react'
import { useState,useEffect } from 'react';
import TopBar from '../../components/topbar';

const EditCompanyProfile = () => {
    const [companyName, setCompanyName] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [streetAddress, setStreetAdd] = useState('');
    const [cityName, setCityName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [countryName, setCountryName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [industry, setIndustry] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('http://localhost:3000/user/details');
            const result = await response.json();

                setUsername(result.username);
                setPassword(result.password);
                setStreetAdd(result.streetAddress)
                setCityName(result.cityName);
                setZipCode(result.zipCode);
                setCountryName(result.countryName);
                setEmailAddress(result.emailAddress);
                setPhoneNumber(result.contactNum);
                setBio(result.biography);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        const fetchCompanyData = async () => {
          try {
            const response = await fetch('http://localhost:3000/company/details');
            const result = await response.json();
            setCompanyName(result.companyName);
            setCompanySize(result.companySize);
          } catch (error) {
            console.error('Error fetching data:', error);
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
          formData.append('companyName', companyName);
          formData.append('companySize', companySize);
          formData.append('industry', industry);
          formData.append('username', username);
          formData.append('password', password);
          formData.append('streetAddress', streetAddress);
          formData.append('cityName', cityName);
          formData.append('zipCode', zipCode);
          formData.append('countryName', countryName);
          formData.append('emailAddress', emailAddress);
          formData.append('contactNum', phoneNumber);
          formData.append('biography', bio);
         
    
        //   for (const value of formData.values()) {
        //     console.log(value);
        //   }
    
          // const data = new URLSearchParams();
          
          // for (const pair of formData.values()) {
          //   data.append(pair[0], pair[1]);
          // }
        try {
          // Send the article data to your server
          const response = await fetch('http://localhost:3000/api/updatecompany', {
            method: 'PUT',
            body: formData
          });
    
          const responseData = await response.json();
    
          if (!response.ok) {
            throw new Error(responseData.error);
          }    
         
        } catch (error) {
          console.error('Error creating person:', error);
        }
      };
  return (
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl'>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Company Name</span>
          </div>
        </label>
        <input type="text" id="Company Name" placeholder="Company Name" className="input input-bordered w-full " value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

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
      <input type="text" id="streetAddress" placeholder="House #, Street Name" className="input input-bordered w-full col-span-2" value={streetAddress} onChange={(e) => setStreetAdd(e.target.value)} />
        <input type="text" id="cityName" placeholder="City Name" className="input input-bordered w-full " value={cityName} onChange={(e) => setCityName(e.target.value)} />
        <input type="text" id="zipCode" placeholder="Zip Code" className="input input-bordered w-full" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        <input type="text" id="countryName" placeholder="Country Name" className="input input-bordered w-full col-span-2" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
      </div>
      
      <div className='grid grid-cols-2 gap-2 w-full'>
        <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Industry</span>
          </div>
        </label>
        <input type="text" id="industry" placeholder="Industry" className="input input-bordered w-full " value={industry} onChange={(e) => setIndustry(e.target.value)} />


        </div>
        <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Company Size</span>
          </div>
        </label>
        <input type="text" id="companysize" placeholder="Company Size" className="input input-bordered w-full" value={companySize} onChange={(e) => setCompanySize(e.target.value)} />

        </div>

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
            <span className="label-text font-bold">Company Logo</span>
          </div>
        </label>
          <input type="file" id="profilePicture" className="file-input file-input-bordered w-full max-w-xs" />
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
              <span className="label-text font-bold">Business Permit</span>
            </div>
          </label>
        <input type="file" id="validId" className="file-input file-input-bordered w-full" />
        <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">DTI Registration</span>
            </div>
          </label>
        <input type="file" id="validId" className="file-input file-input-bordered w-full" />
        <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">SEC Registration</span>
            </div>
          </label>
        <input type="file" id="validId" className="file-input file-input-bordered w-full" />
      </div>

      <button type="submit" className={`btn btn-primary w-40 mt-5`}>Update Account</button>

      </div>
    </form>
  )
}

export default EditCompanyProfile