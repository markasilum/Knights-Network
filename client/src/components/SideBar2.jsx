import React from 'react'

const SideBar2 = () => {
  return (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Profile"} onCick={"/profile"} />
      <SidebarButton text={"Job Posts"} onCick={"/home"} />
      <SidebarButton text={"Applications"} onCick={"/application-dashboard"} />
      <SidebarButton text={"Events"} />
      <SidebarButton text={"Calendar"} />
      <SidebarButton text={"Logout"} onCick={"/login"} />
    </ul>
  )
}

export default SideBar2