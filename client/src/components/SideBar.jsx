import React, { useContext, useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAccount from "../pages/Create-Account/CreateAccount";
import HomePage from "../pages/Profile/ProfilePage";
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAuthContext } from "../hooks/useAuthContext";
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
const SideBar = () => {
  const {user} = useAuthContext()
  const role = user.user.role
  let userSideBar

  const companySidebar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} icon={<PersonIcon fontSize="large"/>} onClick={"/profile"} />
      <SidebarButton text={"Job Posts"} icon={<FeedIcon fontSize="large"/>} onClick={"/jobpost/dashboard"} />
      <SidebarButton text={"Home"} icon={<HomeIcon fontSize="large"/>} onClick={"/home"} />
      <SidebarButton text={"Events"} icon={<EventIcon fontSize="large"/> } onClick={"/events"}/>
      <SidebarButton text={"Calendar"} icon={<CalendarMonthIcon fontSize="large"/>} onClick={'/events/calendar'} />
      <SidebarButton text={"Surveys"}  onClick={'/surveys/view'} />
    </ul>
  )

  const alumniSideBar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} icon={<PersonIcon fontSize="large"/>} onClick={"/profile"} />
      <SidebarButton text={"Job Posts"} icon={<FeedIcon fontSize="large"/>} onClick={"/home"} />
      <SidebarButton text={"Applications"} icon={<ContactPageIcon fontSize="large"/>} onClick={"/applications"} />
      <SidebarButton text={"Events"} icon={<EventIcon fontSize="large"/> } onClick={"/events"}/>
      <SidebarButton text={"Calendar"} icon={<CalendarMonthIcon fontSize="large"/>} onClick={'/events/calendar'}/>
    </ul>
  )

  const adminSideBar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
    <SidebarButton text={"Events"} icon={<EventIcon fontSize="large"/> } onClick={"/eventslist"} />
    <SidebarButton text={"Users"}  icon={<PeopleIcon fontSize="large"/>}  onClick={"/verify-users/alumni"} />
    <SidebarButton text={"Calendar"} icon={<CalendarMonthIcon fontSize="large"/>} onClick={'/events/calendar'} />
    <SidebarButton text={"Surveys"}  onClick={'/surveys'} />
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
