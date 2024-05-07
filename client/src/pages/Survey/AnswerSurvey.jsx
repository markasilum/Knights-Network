import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import DateConverter from "../../components/DateConverter";
import ButtonPrimary from "../../components/ButtonPrimary";

const AnswerSurvey = () => {
  const [surveyData, setSurveyData] = useState();
  const [answers, setAnswers] = useState([]);
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

  const updateAnswers = (itemId, radioValue) => {
    setAnswers(prevAnswers => {
        const existingIndex = prevAnswers.findIndex(item => item.id === itemId);
        if (existingIndex !== -1) {
          // Update the existing item
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingIndex] = { id: itemId, value: radioValue };
          return updatedAnswers;
        } else {
          // Add a new item
          return [...prevAnswers, { id: itemId, value: radioValue }];
        }
      });
   
  };
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        { console.log(answers)}
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
              <div className="w-full bg-neutral grid grid-cols-2 border-b-2 p-2">
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
                      <input
                        type="radio"
                        value={1}
                        name={`radio-${item.id}`}
                        className="radio radio-success radio-sm"
                        onChange={() => updateAnswers(item.id, 1)}
                      />
                      <input
                        type="radio"
                        value={2}
                        name={`radio-${item.id}`}
                        className="radio radio-success radio-sm"
                        onChange={() => updateAnswers(item.id, 2)}

                      />
                      <input
                        type="radio"
                        value={3}
                        name={`radio-${item.id}`}
                        className="radio radio-success radio-sm"
                        onChange={() => updateAnswers(item.id, 3)}

                      />
                      <input
                        type="radio"
                        value={4}
                        name={`radio-${item.id}`}
                        className="radio radio-success radio-sm"
                        onChange={() => updateAnswers(item.id, 4)}

                      />
                      <input
                        type="radio"
                        value={5}
                        name={`radio-${item.id}`}
                        className="radio radio-success radio-sm"
                        onChange={() => updateAnswers(item.id, 5)}

                      />
                    </div>
                  </div>
                ))}

                <div className="w-full flex justify-end">
                <ButtonPrimary text={"Submit"}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerSurvey;
