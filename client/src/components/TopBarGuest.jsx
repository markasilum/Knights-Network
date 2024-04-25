import React from 'react'
import UniversitySealWhite from "../assets/UniversitySealWhite.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const TopBarGuest = () => {
  return (
    <div className="navbar bg-primary text-base-100 text-2xl max-h-14 flex flex-row w-full">
      <div className="flex flex-row w-[38%]">
        <img src={UniversitySealWhite} className="h-12 w-12 m-3" />
          <Link to="/login">
            <p className="bg-primary font-sans font-thin">KNIGHTS NETWORK</p>
          </Link>
       
      </div>
    </div>
  )
}

export default TopBarGuest