import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import JobPostCard from "../../components/JobPostCard";

const Homepage = () => {
  const [userRole, setUserRole] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/role");
        const getUserResult = await response.json();
        setUserRole(getUserResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchJobPosts = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/getalljobpost");
          const getJobPostsResult = await response.json();
          setJobPosts(getJobPostsResult);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    fetchJobPosts()
    fetchUserRole();
  }, []);

  return (
    <div className="w-9/12 bg-neutral h-screen flex flex-col shadow-xl bg">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar userRole={userRole} />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="pt-5 pr-5 pl-3 ">
                <div className="w-full bg-white h-screen p-5 rounded-xl mb-20 overflow-scroll">
                    <JobPostCard jobData={jobPosts}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
