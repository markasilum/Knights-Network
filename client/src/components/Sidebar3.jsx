import React from 'react'

const Sidebar3 = () => {
  return (
    <ul className="menu menu-lg bg-base-100  w-3/12 h-screen p-5 gap-3">
      <SidebarButton text={"Events"} onCick={"/events-dashboard"} />
      <SidebarButton text={"Users"} onCick={"/userslist"} />
      <SidebarButton text={"Calendar"} />
      <SidebarButton text={"Logout"} onCick={"/login"} />
    </ul>
  )
}

export default Sidebar3