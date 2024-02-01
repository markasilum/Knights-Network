import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const SidebarButton = ({onCick, text}) => {
  return (
    // <div className='w-full border-solid	border-2 h-12 flex flex-col justify-center p-5'>{text}</div>

    <li className='bg-neutral rounded-lg'><Link to={onCick}>{text}</Link></li>
      
  )
}

export default SidebarButton