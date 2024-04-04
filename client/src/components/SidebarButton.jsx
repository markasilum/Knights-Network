import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
const SidebarButton = ({onCick, text,icon}) => {
  return (
    // <div className='w-full border-solid	border-2 h-12 flex flex-col justify-center p-5'>{text}</div>

    <li className='bg-neutral rounded-lg p-0'><Link to={onCick}>{icon}{text}</Link></li>
      
  )
}

export default SidebarButton