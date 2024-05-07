import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";

const SurveyDetails = () => {
  const [surveyData, setSurveyData] = useState();
  const { surveyId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/survey/details?id=${surveyId}`,
          {
            credentials: "include",
          }
        );

        const responseData = await response.json();
        setSurveyData(responseData);
      } catch (error) {}
    };

    getDetails();
  }, []);
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
          <div className="pt-2 pr-2 overflow-x-auto">
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white gap-3">
              {surveyData && <p className="text-xl">{surveyData.name}</p>}
              {surveyData &&
                surveyData.questions.length != 0 &&
                surveyData.questions.map((item, index) => 
                <div key={item.id} className="flex flex-row gap-2">
                  <p>{index+1}{") "}</p>
                  <p>{item.questionText}</p>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
