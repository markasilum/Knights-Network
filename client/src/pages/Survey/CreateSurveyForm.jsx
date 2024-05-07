import React, { useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";

const CreateSurveyForm = () => {
    const navigate = useNavigate()
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [name, setName] = useState("");
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "" }]);
  };
  const handleChange = (event, index) => {
    event.preventDefault();
    let { name, value } = event.target;
    let onChangeValue = [...questions];
    onChangeValue[index].question = value;
    setQuestions(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...questions];
    newArray.splice(index, 1);
    setQuestions(newArray);
  };

  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    // event.preventDefault();

    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("questions", JSON.stringify(questions));
    console.log(questions)

    try {
      const response = await fetch("http://localhost:3000/survey/create", {
        method: "POST",
        body: formData,
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      navigate("/surveys")
      
    } catch (error) {
      // setIsSubmitting(false);
      console.error("Error creating person:", error);
    }
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
          <div className="pt-2 pr-2 overflow-x-auto">
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white">
              <div className="col-span-2">
                <span className="label-text text-xl">Create Survey</span>
              </div>

              <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-normal">Survey Name</span>
                  </div>
                </label>

              <input
                type="text"
                id={"name"}
                className="input input-bordered w-1/2 col-span-2 mb-5"
                name={"name"}
                value={name}
                placeholder={"SurveyName"}
                onChange={(e)=>setName(e.target.value)}
              
              />

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-normal">Survey Questions</span>
                  </div>
                </label>

              <div className="col-span-2 flex flex-col gap-2">
                {questions.map((item, index) => (
                  <div
                    className="grid grid-cols-3 gap-3 place-items-start"
                    key={index}
                  >
                    <div className="flex flex-col col-span-2 w-full">
                      <input
                        type="text"
                        id={"question"}
                        className="input input-bordered w-full col-span-2"
                        name={"question"}
                        value={item.skillName}
                        placeholder={"question"}
                        onChange={(event) => handleChange(event, index)}
                      />

                      {index === questions.length - 1 && (
                        <button
                          className={`btn btn-success  btn-sm text-white mt-3 w-1/4`}
                          onClick={() => handleAddQuestion()}
                        >
                          Add
                        </button>
                      )}
                    </div>

                    {questions.length > 1 && (
                      <button
                        className={`btn btn-info btn-sm text-white items-center w-fit h-12`}
                        onClick={() => handleDeleteInput(index)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className={`btn btn-primary w-40 mt-10 col-span-2`}
                  onClick={handleSubmit}
                >
                  Create Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyForm;
