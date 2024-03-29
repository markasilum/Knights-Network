import React, { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAccount from "../pages/Create-Account/CreateAccount";
import HomePage from "../pages/Profile/ProfilePage";

const SideBar = () => {
  const [role, setUserRole] = useState([]);
  let userSideBar


  useEffect(()=>{
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/role");
        const getUserResult = await response.json();
        setUserRole(getUserResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchUserRole();


  },[])


  const companySidebar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} onCick={"/profile"} />
      <SidebarButton text={"Job Posts"} onCick={"/jobpostdashboard"} />
      <SidebarButton text={"Events"} />
      <SidebarButton text={"Calendar"} />
      <SidebarButton text={"Logout"} onCick={"/login"} />
    </ul>
  )

  const alumniSideBar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} onCick={"/profile"} />
      <SidebarButton text={"Job Posts"} onCick={"/home"} />
      <SidebarButton text={"Applications"} onCick={"/application-dashboard"} />
      <SidebarButton text={"Events"} />
      <SidebarButton text={"Calendar"} />
      <SidebarButton text={"Logout"} onCick={"/login"} />
    </ul>
  )

  const adminSideBar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Events"} onCick={"/eventslist"} />
      <SidebarButton text={"Users"} onCick={"/userslist"} />
      <SidebarButton text={"Calendar"} />
      <SidebarButton text={"Logout"} onCick={"/login"} />
    </ul>
  )
  if(role.roleName == "company"){
    userSideBar = companySidebar
  }else if(role.roleName == "alumni" || role.roleName == "student"){
    userSideBar = alumniSideBar
  }else if(role.roleName == "admin"){
    userSideBar = adminSideBar
  }

  return (
    // <div className='w-3/12 bg-slate-500 flex flex-col gap-4 h-screen p-5'>
    userSideBar
    //  </div>
  );
};

export default SideBar;
