import React from "react";

const SelectEditExperience = ({expData}) => {
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />

        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-scroll">
            <div className="w-full bg-white h-fit p-5 rounded-xl mb-2">
              <div className="flex flex-col">
                <div className="border-b-2 border-dashed border-info"></div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectEditExperience;
