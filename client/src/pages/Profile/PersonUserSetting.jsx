import React from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import ButtonPrimary from "../../components/ButtonPrimary";

const PersonUserSetting = () => {
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3">
            <div className="w-1/2 bg-white  h-fit p-3 rounded-xl mb-20 flex flex-col">
              <h1 className="font-semibold text-xl">Account Preferences</h1>
              <div className="border border-b border-info mt-2 mb-2"></div>

              <div className="flex flex-col w-full gap-2">
                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">Receive Job Recommendation</span>
                    <input type="checkbox" className="toggle toggle-success" />
                  </label>
                </div>

              
                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">Looking for a job?</span>
                    <input type="checkbox" className="toggle toggle-success" />
                  </label>
                </div>

        
                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">Allow others to view my resume</span>
                    <input type="checkbox" className="toggle toggle-success" />
                  </label>
                </div>
                
                
                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">Allow others to download my resume</span>
                    <input type="checkbox" className="toggle toggle-success" />
                  </label>
                </div>
              </div>

              <ButtonPrimary text={"Save"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonUserSetting;
