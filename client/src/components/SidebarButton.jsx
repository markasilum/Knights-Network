import React from 'react'
import {BrowserRouter as Router,Route, Link} from "react-router-dom";
const SidebarButton = ({onClick, text,icon}) => {
  return (
    // <div className='w-full border-solid	border-2 h-12 flex flex-col justify-center p-5'>{text}</div>

    <li className='bg-neutral rounded-lg p-0'><Link to={onClick}>{icon}{text}</Link></li>
      
  )
}

export default SidebarButton