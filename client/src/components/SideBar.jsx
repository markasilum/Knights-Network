import React, { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAccount from "../pages/Create-Account/CreateAccount";
import HomePage from "../pages/Profile/ProfilePage";

const SideBar = () => {


  return (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
    <SidebarButton text={"Profile"} onCick={"/profile"} />
    <SidebarButton text={"Job Posts"} onCick={"/job-posts-dashboard"} />
    <SidebarButton text={"Events"} />
    <SidebarButton text={"Calendar"} />
    <SidebarButton text={"Logout"} onCick={"/login"} />
  </ul>
  );
};

export default SideBar;
