import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ButtonNavigator from "./ButtonNavigator";

const JobPostCard = ({ jobData }) => {
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit flex flex-col rounded-xl mb-20 gap-3">
      {jobData.map(
        (job) =>
          job.isOpen && (
            <div
              key={job.id}
              className="bg-neutral h-fit w-full rounded-lg flex flex-col p-3"
            >
              <h1 className="font-semibold">{job.jobTitle}</h1>
              <Link
                className={`font-normal hover:underline decoration-1`}
                to={`/profile/view/${job.companyId}`}
              >
                {job.company.companyName}
              </Link>
              <p className="font-thin">{job.jobLoc}</p>

              <div className="font-thin flex flex-col mt-3">
                <p className="font-normal">Job Description</p>
                <ul className="list-disc ml-5">
                  {job.jobDesc.split("\r\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 w-full flex flex-row justify-between items-center">
                <div>
                  <h2>
                    Employment Type:{" "}
                    <span className="font-thin">{job.employmentType}</span>
                  </h2>
                  <h2>
                    Work Model:{" "}
                    <span className="font-thin">{job.workModel}</span>
                  </h2>
                </div>
                <ButtonNavigator
                  path={`/jobpost/view/${job.id}`}
                  text={"View Details"}
                />
              </div>
            </div>
          )
      )}
      <div></div>
    </div>
  );
};

export default JobPostCard;
