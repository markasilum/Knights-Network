import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DateToWords from "./DateFormatter";
import ExperienceForm from "../pages/Create-Credentials/ExperienceForm";
const ExperienceCards = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/experience/person/index`,
          {
            credentials: "include",
          }
        );
        const getUserResult = await response.json();
        setExperience(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchExperience();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between border-b-2 border-solid border-neutral mb-2">
        <span className="font-bold">Experience</span>
        <div className="flex gap-3">
          {/* <Link to="/expform" className='font-thin underline'>Add</Link> */}
          <button
            className="font-thin underline"
            onClick={() =>
              document.getElementById("add_experience").showModal()
            }
          >
            Add
          </button>
          <Link to="/experience-edit" className="font-thin underline">
            Edit
          </Link>
        </div>
      </div>
      <ExperienceForm />

      {experience.map((experience) => (
        <div key={experience.id} className="flex flex-col mb-5">
          <span className="font-semibold">{experience.jobTitle}</span>
          <span className="">{experience.companyName}</span>
          <div className="flex flex-row gap-1 mb-2">
            <span className="font-thin">
              <DateToWords dateString={experience.startDate} />
            </span>
            <span className="font-thin">-</span>
            <span className="font-thin">
              <DateToWords dateString={experience.endDate} />
            </span>
          </div>
          <ul className="list-disc ml-8 font-thin">
            {experience.jobDetails.split("\r\n").map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceCards;
