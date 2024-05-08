import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import Cookies from 'js-cookie';
import MondalPendingVerification from '../../components/ModalPendingVerification';
import ModalPendingVerification from '../../components/ModalPendingVerification';
import ModalAccountReactivate from '../../components/ModalAccountReactivate';
const LoginScreen = () => {
  const navigate = useNavigate()

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const {dispatch} = useAuthContext()

  useEffect(()=>{
    const fetchEmailCookie = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/email",{
          credentials:'include'
        });
        const getUserResult = await response.json();
        setEmail(getUserResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchEmailCookie()
  },[])

  const login = async (event) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      
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
        setIsLoading(false)
        throw new Error(data.error);
      }
      
      if(response.ok){
        console.log("ok")
        dispatch({type:'LOGIN', payload: data})
        

        if(data.user.role.roleName=="alumni" || data.user.role.roleName =="student"){
          navigate("/profile")
        }else if(data.user.role.roleName =="company"){
          navigate("/jobpost/dashboard")
        }else{
          navigate("/eventslist")
        }

        setIsLoading(false)
      }
      // console.log(data)
    } catch (error) {
      if (error.message === "Invalid credentials") {
        setErrorMessage({ invalidCredentials: "Invalid credentials" });
      }else if(error.message === "Pending account verification"){
        setErrorMessage({ verification: "Pending account verification" });
      } else if(error.message === "Account is deactivated"){
        setErrorMessage({ deactivate: "Account is deactivated" });
      } else if(error.message === "Account is banned"){
        setErrorMessage({ banned: "Account is banned" });
      } 
    }
  };


  return (
    <div className="h-screen w-9/12 bg-white shadow-xl grid grid-cols-3">
      <div className="h-full col-span-2 flex flex-col justify-center align-center">
        <div className="flex flex-col bg-white h-1/2 justify-center items-center">
          <span className="text-6xl text-primary font-TrajanRegular">
            KNIGHTS NETWORK
          </span>
          <span className="text-3xl text-primary font-TrajanRegular">
            ATENEO DE DAVAO UNIVERSITY
          </span>
        </div>
      </div>
      <div className="h-full flex flex-col justify-center align-center">
        <div className="flex flex-col bg-primary h-fit min-h-[67%] rounded-2xl mr-6 p-8 gap-3 items-center justify-center">
          <img src="src\assets\ACCAHlogo.png" className="h-[200px]" />

          <form onSubmit={login} className=" w-11/12">
            <div className="flex flex-col gap-3">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div>
              {errorMessage.invalidCredentials && (
                <span className="text-error  font-normal h-fit w-full flex flex-col items-center">
                  {errorMessage.invalidCredentials}
                </span>
              )}
              {errorMessage.verification &&
                document.getElementById("pendingVerification").showModal()}
              
              {errorMessage.deactivate &&
                document.getElementById("deactivated").showModal()}
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-3 mt-4">
              <button
                type="submit"
                className="btn w-2/3 btn-accent text-white text-xl"
                disabled={isLoading}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary w-2/3 text-white text-xl"
              >
                <Link
                  className="btn btn-secondary w-2/3 text-white text-xl"
                  to="/register"
                >
                  Register
                </Link>
              </button>
            </div>
          </form>

          <ModalPendingVerification setErrorMessage={setErrorMessage} />
          <ModalAccountReactivate setErrorMessage={setErrorMessage} email={email} password={password}/>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen