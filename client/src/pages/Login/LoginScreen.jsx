import React from 'react'
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
const LoginScreen = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        <div className="flex flex-col bg-primary h-4/6 rounded-2xl mr-6 p-8 gap-3 items-center justify-center">
            <img src="src\assets\UniversitySealWhite.png" className='h-[200px]'/>
            <input type="text" id="username" placeholder="Username" className="input input-bordered w-full " value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" id="password" placeholder="Password" className="input input-bordered w-full " value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button className='btn btn-accent w-2/3 text-white text-xl'><Link to="/home">Login</Link></button>
            <button className='btn btn-secondary w-2/3 text-white text-xl'><Link to="/create-account">Register</Link></button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen