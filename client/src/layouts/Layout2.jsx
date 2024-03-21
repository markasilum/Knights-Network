import React from "react";
import TopBar from "../components/topbar";

const Layout2 =
  (Component) =>
  ({ ...props }) => {
    return (
      <div className="className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	">
        <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
          <TopBar />

          <Component {...props} />
        </div>
      </div>
    );
  };

export default Layout2;
