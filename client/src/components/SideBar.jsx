import React from 'react'
import SidebarButton from './SidebarButton'

const SideBar = () => {
  return (
    // <div className='w-3/12 bg-slate-500 flex flex-col gap-4 h-screen p-5'>
    
    // </div>

    <ul className="menu menu-lg bg-base-100 w-3/12 h-screen p-5 gap-3 shadow-lg">
        <SidebarButton text={"Profile"}/>
        <SidebarButton text={"Job Posts"}/>
        <SidebarButton text={"Applications"}/>
        <SidebarButton text={"Events"}/>
        <SidebarButton text={"Calendar"}/> 
  </ul>
  )
}

export default SideBar