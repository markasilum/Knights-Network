import React from 'react'
import SidebarButton from './SidebarButton'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CreateAccount from '../pages/Create-Account/CreateAccount';
import HomePage from './HomePage';
import Mainpage from './Mainpage';

const SideBar = () => {
  return (
    // <div className='w-3/12 bg-slate-500 flex flex-col gap-4 h-screen p-5'>
    
        <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
          <SidebarButton text={"Profile"}/>
          <SidebarButton text={"Job Posts"}/>
          <SidebarButton text={"Applications"}/>
          <SidebarButton text={"Events"}/>
          <SidebarButton text={"Calendar"}/> 
          <div>--------TEMPORARY ROUTES--------</div>
          <SidebarButton text={"Create Account"} onCick={"/createaccount"}/> 
        </ul>
  //  </div>
    
  )
}

export default SideBar