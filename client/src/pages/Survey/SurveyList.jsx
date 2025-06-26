import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import DateConverter from "../../components/DateConverter";

const SurveyList = () => {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const getSurveyIndex = async () => {
      try {
        const response = await fetch("http://localhost:3000/survey/index", {
          credentials: "include",
        });

        const responseData = await response.json();
        setSurveyData(responseData);
      } catch (error) {}
    };

    getSurveyIndex();
  }, []);
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
          <div className="pt-2 pr-2 overflow-x-auto">
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white">
                <div className="text-xl w-full border-b-2 mb-2 border-dashed">Surveys</div>
              <table className="table bg-white rounded-xl">
                <thead>
                  {/* <tr>
                      <th>Survey Name</th>
                      <th>Take Survey</th>
                      <th>Date Created</th>
                  </tr> */}
                </thead>
                <tbody>
                  {surveyData.map((survey) => (
                    <tr key={survey.id} className=" align-center hover">
                      <td>{survey.name}</td>
                      <td className="flex justify-end">
                        <Link
                          className="btn btn-success btn-xs text-white"
                          to={`/surveys/answer/${survey.id}`}
                        >
                          Answer Survey
                        </Link>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
