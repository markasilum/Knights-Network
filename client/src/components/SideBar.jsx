import React, { useContext, useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAccount from "../pages/Create-Account/CreateAccount";
import HomePage from "../pages/Profile/ProfilePage";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { useAuthContext } from "../hooks/useAuthContext";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HomeIcon from '@mui/icons-material/Home';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
const SideBar = () => {
  const {user} = useAuthContext()
  const role = user.user.role
  let userSideBar

  const companySidebar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} icon={<PersonOutlinedIcon fontSize="large"/>} onClick={"/profile"} />
      <SidebarButton text={"Job Posts"} icon={<FeedOutlinedIcon fontSize="large"/>} onClick={"/jobpost/dashboard"} />
      <SidebarButton text={"Home"} icon={<HomeIcon fontSize="large"/>} onClick={"/home"} />
      <SidebarButton text={"Events"} icon={<EventOutlinedIcon fontSize="large"/> } onClick={"/events"}/>
      <SidebarButton text={"Calendar"} icon={<CalendarMonthOutlinedIcon fontSize="large"/>} onClick={'/events/calendar'} />
      <SidebarButton text={"Surveys"} icon={<PollOutlinedIcon/>} onClick={'/surveys/view'} />
    </ul>
  )

  const alumniSideBar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} icon={<PersonOutlinedIcon fontSize="large"/>} onClick={"/profile"} />
      <SidebarButton text={"Job Posts"} icon={<FeedOutlinedIcon fontSize="large"/>} onClick={"/home"} />
      <SidebarButton text={"Applications"} icon={<ContactPageOutlinedIcon fontSize="large"/>} onClick={"/applications"} />
      <SidebarButton text={"Events"} icon={<EventOutlinedIcon fontSize="large"/> } onClick={"/events"}/>
      <SidebarButton text={"Calendar"} icon={<CalendarMonthOutlinedIcon fontSize="large"/>} onClick={'/events/calendar'}/>
    </ul>
  )

  const adminSideBar = (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
    <SidebarButton text={"Events"} icon={<EventOutlinedIcon fontSize="large"/> } onClick={"/eventslist"} />
    <SidebarButton text={"Users"}  icon={<GroupOutlinedIcon fontSize="large"/>}  onClick={"/verify-users/alumni"} />
    <SidebarButton text={"Calendar"} icon={<CalendarMonthOutlinedIcon fontSize="large"/>} onClick={'/events/calendar'} />
    <SidebarButton text={"Surveys"} icon={<PollOutlinedIcon fontSize="large"/>} onClick={'/surveys'} />
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
