import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import DateConverter from "../../components/DateConverter";
import ButtonPrimary from "../../components/ButtonPrimary";

const SurveyViewAnswers = () => {
  const [surveyData, setSurveyData] = useState();
  const [companyNames, setCompanyNames] = useState(new Set());

  const { surveyId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/survey/answers?id=${surveyId}`,
          {
            credentials: "include",
          }
        );

        const responseData = await response.json();
        setSurveyData(responseData);

        const uniqueCompanyNames = new Set();
        responseData.questions.forEach(question => {
          question.answers.forEach(answer => {
            uniqueCompanyNames.add(answer.company.companyName);
          });
        });
        setCompanyNames(uniqueCompanyNames);
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
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white">
              {surveyData && (
                <p className="text-xl w-full border-b-2 border-dashed ">
                  {surveyData.name}
                </p>
              )}
              <div className="w-full bg-white flex justify-start gap-3 pr-10 mt-2 mb-2">
                <div>1: Poor</div>
                <div>2: Below Average</div>
                <div>3: Average</div>
                <div>4: Above Average</div>
                <div>5: Excellent</div>
              </div>
              <div className="w-full bg-neutral grid grid-cols-2 border-b-2 p-2 font-semibold">
                <div>Rating</div>
                <div className="w-full flex flex-row  pr-10 justify-between ">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                </div>
              </div>

              {surveyData &&
                surveyData.questions.length != 0 &&
                surveyData.questions.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full bg-neutral grid grid-cols-2 p-2 border-b-2 items-center"
                  >
                    <div className="flex flex-row gap-2 w-96">
                      <p>
                        {index + 1}
                        {") "}
                      </p>
                      <p>{item.questionText}</p>
                    </div>

                    <div className="w-full flex flex-row pr-10 justify-between">
                      {/* Count of answers that are 1 */}
                      <div>
                        {
                          item.answers.filter(
                            (answer) => answer.answerValue === 1
                          ).length
                        }
                      </div>
                      {/* Count of answers that are 2 */}
                      <div>
                        {
                          item.answers.filter(
                            (answer) => answer.answerValue === 2
                          ).length
                        }
                      </div>
                      {/* Count of answers that are 3 */}
                      <div>
                        {
                          item.answers.filter(
                            (answer) => answer.answerValue === 3
                          ).length
                        }
                      </div>
                      {/* Count of answers that are 4 */}
                      <div>
                        {
                          item.answers.filter(
                            (answer) => answer.answerValue === 4
                          ).length
                        }
                      </div>
                      {/* Count of answers that are 5 */}
                      <div>
                        {
                          item.answers.filter(
                            (answer) => answer.answerValue === 5
                          ).length
                        }
                      </div>
                    </div>
                  </div>
                ))}

              {/* display total here */}
              {surveyData&&(
                <div className="w-full bg-neutral grid grid-cols-2 border-2 mt-1 p-2 font-semibold">
                <div>Total Frequency</div>
                <div className="w-full flex flex-row  pr-10 justify-between ">
                  {/* Calculate total frequency */}
                  {surveyData.questions
                    .reduce(
                      (total, item) => {
                        item.answers.forEach((answer) => {
                          total[answer.answerValue - 1]++;
                        });
                        return total;
                      },
                      [0, 0, 0, 0, 0]
                    )
                    .map((count, idx) => (
                      <div key={idx}>{count}</div>
                    ))}
                </div>
              </div>
              )}
              
              <div className="mt-5">
                <h2>Answered by:</h2>
                <ul className="list-disc pl-5">
                    {[...companyNames].map(companyName => (
                    <li key={companyName}>{companyName}</li>
                    ))}
                </ul>
                {/* Render other survey details here */}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyViewAnswers;
