import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UniversitySealWhite from "../assets/UniversitySealWhite.png";
import { RoleContext } from "../App";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
const TopBar = () => {
  const { role } = useContext(RoleContext);
  return (
    <div className="navbar bg-primary text-base-100 text-2xl max-h-14 flex flex-row w-full">
      <div className="flex flex-row w-1/3">
        <img src={UniversitySealWhite} className="h-12 w-12 m-3" />
        {role.roleName == "alumni" && (
          <Link to="/home">
            <p className="bg-primary font-sans font-thin">KNIGHTS NETWORK</p>
          </Link>
        )}
        {role.roleName == "student" && (
          <Link to="/home">
            <p className="bg-primary font-sans font-thin">KNIGHTS NETWORK</p>
          </Link>
        )}
        {role.roleName == "company" && (
          <Link to="/jobpost/dashboard">
            <p className="bg-primary font-thin">KNIGHTS NETWORK</p>
          </Link>
        )}
        {role.roleName == "admin" && (
          <Link to="/events">
            <p className="bg-primary font-sans font-thin">KNIGHTS NETWORK</p>
          </Link>
        )}
      </div>
      <div className="form-control w-full flex flex-row justify-start ml-10 text-black ">
        <select className="select select-bordered w-36 max-w-xs rounded-tl rounded-bl  rounded-none outline-none focus:outline-none focus-within:outline-none"    defaultValue={"Job Posts"}>
          <option value={"jobPost"}>Job Posts</option>
          <option value={"Companies"}>Companies</option>
          <option value={"People"}>People</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-1/2 text-secondary rounded-tr rounded-br  rounded-none outline-none focus:outline-none focus-within:outline-none "
        />
      </div>

      <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
          <svg
            className="swap-off fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-56 mt-4 text-black "
        >
          <li>
            <Link to={"/settings"}>
              <SettingsIcon />
              Settings
            </Link>
          </li>
          <li>
            <Link to={"/login"}>
              <LogoutIcon />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
