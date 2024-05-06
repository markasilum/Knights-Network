import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UniversitySealWhite from "../assets/UniversitySealWhite.png";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";
const TopBar = () => {
  const {user} = useAuthContext()
  let role
  if(user){
     role = user.user.role
  }else{
    role={"role":"guest"}
  }

  return (
    <div className="navbar bg-primary text-base-100 text-2xl max-h-14 flex flex-row w-full">
      <div className="flex flex-row w-[45%]">
        <img src={UniversitySealWhite} className="h-12 w-12 m-3" />
        {role.roleName == "alumni" && (
          <Link to="/home">
            <p className="bg-primary font-TrajanRegular font-thin">
              KNIGHTS NETWORK
            </p>
          </Link>
        )}
        {role.roleName == "student" && (
          <Link to="/home">
            <p className="bg-primary font-TrajanRegular font-thin">
              KNIGHTS NETWORK
            </p>
          </Link>
        )}
        {role.roleName == "company" && (
          <Link to="/jobpost/dashboard">
            <p className="bg-primary font-TrajanRegular font-thin">
              KNIGHTS NETWORK
            </p>
          </Link>
        )}
        {role.roleName == "admin" && (
          <Link to="/eventslist">
            <p className="bg-primary font-TrajanRegular font-thin">
              KNIGHTS NETWORK
            </p>
          </Link>
        )}

        {!role && (
          <Link to="/login">
            <p className="bg-primary font-TrajanRegular font-thin">
              KNIGHTS NETWORK
            </p>
          </Link>
        )}
      </div>
      <SearchBar/>

      {(role.roleName == 'alumni' || role.roleName == 'student')&&(
        <Notifications/>
      )}

      <div className="dropdown dropdown-end">
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
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-xl w-56 mt-4 text-black "
        >
          {(role.roleName == 'alumni' || role.roleName == 'student')&&(
            <li>
            <Link to={"/settings"}>
              <SettingsIcon />
              Settings
            </Link>
          </li>
          )}
          
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
