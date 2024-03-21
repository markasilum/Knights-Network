import React from "react";
import TopBar from "../components/topbar";
import SideBar from "../components/SideBar";

const Layout = (Component) => ({ ...props }) => {
    return (
    <div className="className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	">
        <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        <TopBar />
        
        <div className="flex flex-row gap-2">
          <SideBar />
          <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <Component {...props}/>
          </div>
        </div>
      </div>

    </div>
      
    );
  };

export default Layout;
