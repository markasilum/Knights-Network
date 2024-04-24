import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import TopBar from "../../components/topbar";

const PersonUserSetting = () => {
  const [settingData, setSettingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/user/setting`,{
      credentials:'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setSettingData(data.setting);
        setLoading(false); // Optional: If you want to hide loading state after data fetch
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/user/setting/update", {
        method:"PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settingData),
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
      
    } catch (error) {
      
    }
  }

  if (loading) {
    return (
      <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        <TopBar />
        <div className="flex flex-row gap-2">
          <SideBar />
          <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="pt-5 pr-5 pl-3">
              <div className="w-1/2 bg-white  h-fit p-3 rounded-xl mb-20 flex flex-col">
              <div>Loading...</div>;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      {console.log(settingData)}
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
                    <span className="label-text">
                      Receive Job Recommendation
                    </span>
                    <input type="checkbox" className="toggle toggle-success" 
                    value={settingData.receiveJobReco}
                    checked={settingData.receiveJobReco}
                    onChange={(e) => {
                      setSettingData((prevState) => ({
                        ...prevState,
                        receiveJobReco: !settingData.receiveJobReco, // Update with new value
                      }));
                    }}
                    />
                  </label>
                </div>

                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">Looking for a job?</span>
                    <input type="checkbox" className="toggle toggle-success" 
                      value={settingData.isJobSearching}
                      checked={settingData.isJobSearching}
                      onChange={(e) => {
                        setSettingData((prevState) => ({
                          ...prevState,
                          isJobSearching: !settingData.isJobSearching, // Update with new value
                        }));
                      }}
                    />
                  </label>
                </div>

                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      Allow others to view my resume
                    </span>
                    <input type="checkbox" className="toggle toggle-success" 
                     value={settingData.allowViewResume}
                     checked={settingData.allowViewResume}
                     onChange={(e) => {
                        setSettingData((prevState) => ({
                          ...prevState,
                          allowViewResume: !settingData.allowViewResume, // Update with new value
                        }));
                      }}
                      />
                  </label>
                </div>

                <div className="form-control border-b-2">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      Allow others to download my resume
                    </span>
                    <input
                      type="checkbox"
                      value={settingData.allowDownloadResume}
                      checked={settingData.allowDownloadResume}
                      onChange={(e) => {
                        setSettingData((prevState) => ({
                          ...prevState,
                          allowDownloadResume: !settingData.allowDownloadResume, // Update with new value
                        }));
                      }}
                      className="toggle toggle-success"
                    />
                  </label>
                </div>
              </div>

              <ButtonPrimary onClick={handleSubmit} text={"Save"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonUserSetting;
