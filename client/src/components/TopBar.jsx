import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import UniversitySealWhite from '../assets/UniversitySealWhite.png';
import { RoleContext } from '../App';

const TopBar = () => {
  const{role} = useContext(RoleContext)
  return (
    <div className='navbar bg-primary text-base-100 text-2xl justify-between max-h-14 '>
    <div className='flex flex-row'>
      <img src={UniversitySealWhite} className="h-12 w-12 m-3"/>
      {role.roleName =="alumni" &&(
          <Link to="/profile"><p className='bg-primary font-sans font-thin'>KNIGHTS NETWORK</p></Link>
      )}
       {role.roleName =="student" &&(
          <Link to="/profile"><p className='bg-primary font-sans font-thin'>KNIGHTS NETWORK</p></Link>
      )}
      {role.roleName =="company"&&(
          <Link to="/jobpost/dashboard"><p className='bg-primary font-thin'>KNIGHTS NETWORK</p></Link>
      )}
      {role.roleName =="admin"&&(
          <Link to="/events"><p className='bg-primary font-sans font-thin'>KNIGHTS NETWORK</p></Link>
      )}
    </div>
    {/* <div className="form-control"><input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-secondary" /></div> */}
  </div>
  )
}

export default TopBar