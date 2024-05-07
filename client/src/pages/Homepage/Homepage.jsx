import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import JobPostCard from "../../components/JobPostCard";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Homepage = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const{user} = useAuthContext()
  const role = user.user.role.roleName
  useEffect(() => {

    const fetchJobPosts = async () => {
        try {
          const response = await fetch("http://localhost:3000/jobpost/index",{
            credentials:'include'
          });
          const getJobPostsResult = await response.json();
          setJobPosts(getJobPostsResult);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    fetchJobPosts()
  }, []);

  return (
    <div className="w-9/12 max-w-[1440px] bg-neutral h-screen flex flex-col shadow-xl bg">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="">
                <div className="w-full bg-white h-screen p-5 pt-5 mb-20 overflow-y-auto">
                    <JobPostCard jobData={jobPosts}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
