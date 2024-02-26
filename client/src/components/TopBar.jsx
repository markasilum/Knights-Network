import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
const TopBar = () => {
  return (
    <div className='navbar bg-primary text-base-100 text-2xl justify-between max-h-14'>
    <div className='flex flex-row'>
      <img src="src\assets\UniversitySealWhite.png" className="h-12 w-12 m-3"/>
      <Link to="/profile">KNIGHTS NETWORK</Link>
    </div>
    {/* <div className="form-control"><input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-secondary" /></div> */}
  </div>
  )
}

export default TopBar