import React from 'react'
import SidebarButton from "./SidebarButton";

const SidebarAdmin = () => {
  return (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
    <SidebarButton text={"Events"} onCick={"/eventslist"} />
    <SidebarButton text={"Users"} onCick={"/verify-users/alumni"} />
    <SidebarButton text={"Calendar"} />
    <SidebarButton text={"Logout"} onCick={"/login"} />
  </ul>
  )
}

export default SidebarAdmin