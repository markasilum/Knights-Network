import React, { useEffect, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { user } = useAuthContext();
  const jobIdArr = user.user.person.recommendations.map(
    (item) => item.jobPostId
  );
  const [jobData, setJobData] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/jobpost/index/recommendations",
          {
            method: "POST",
            body: JSON.stringify(jobIdArr),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setJobData(responseData);
      } catch (error) {}
    };

    fetchJobs();
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
        <NotificationsNoneOutlinedIcon />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-xl text-black w-72"
      >
        <p className="text-xs pl-1 pb-1">Recommendations</p>
        {jobData &&
          jobData.map((item, index) => (
            <li key={index} >
              <Link to={`/jobpost/view/${item.id}`} className="" >
                <div className="items-start flex flex-col gap-0">
                  <div className="font-semibold text-base">{item.jobTitle}</div>
                  <div className="font-normal">
                    {item.company.companyName}
                  </div>
                  <div className="font-thin">{item.jobLoc}</div>
                </div>
              </Link>
              
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Notifications;
