import React from 'react'
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
const LoginScreen = () => {
  const navigate = useNavigate()
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
      });
      const data = await response.json();
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      } 
      if(data.role=="alumni" || data.role =="student"){
        navigate("/profile")
      }else if(data.role=="company"){
        navigate("/jobpost/dashboard")
      }else{
        navigate("/eventslist")
      }
      console.log(data)
    } catch (error) {
      // setValid(error)
      setErrorMessage('Wrong Email or Password');
      // console.error("Error fetching data:", error);
    }
  };


  return (
    <div className="h-screen w-9/12 bg-white shadow-xl grid grid-cols-3">
      <div className="h-full col-span-2 flex flex-col justify-center align-center">
        <div className="flex flex-col bg-white h-1/2 justify-center items-center">
          <span className="font-bold  text-6xl text-primary">
            KNIGHTS NETWORK
          </span>
          <span className="text-3xl text-primary">
            ATENEO DE DAVAO UNIVERSITY
          </span>
        </div>
      </div>
      <div className="h-full flex flex-col justify-center align-center">
        <div className="flex flex-col bg-primary h-fit min-h-[67%] rounded-2xl mr-6 p-8 gap-3 items-center justify-center">
            <img src="src\assets\UniversitySealWhite.png" className='h-[200px]'/>
            
            <div className='flex flex-col gap-3 w-full'>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
           
              <div className='text-error w-full text-center'>{errorMessage}</div>
          

            </div>

            <button className='btn btn-accent w-2/3 text-white text-xl' onClick={login}>Login</button>
            <button className='btn btn-secondary w-2/3 text-white text-xl'><Link to="/createaccount">Register</Link></button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen