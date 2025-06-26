import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import JobPostCard from "../../components/JobPostCard";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import ButtonNavigator from "../../components/ButtonNavigator";
import ReactPaginate from "react-paginate";
const Homepage = () => {
  const { user } = useAuthContext();
  const role = user.user.role.roleName;

  const [jobPosts, setJobPosts] = useState([]);
  const openJobPosts = jobPosts.filter(job => job.isOpen);

  const [pageNumber, setPageNumber] = useState(0);
  const itemPerPage = 5;
  const pagesVisited = pageNumber * itemPerPage;

  const pageCount = Math.ceil(openJobPosts.length/itemPerPage);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobpost/index", {
          credentials: "include",
        });
        const getJobPostsResult = await response.json();
        setJobPosts(getJobPostsResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobPosts();
  }, []);
  


  const displayJobPosts = openJobPosts
    .slice(pagesVisited, pagesVisited + itemPerPage)
    .map((job) => {
      return (
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
                Work Model: <span className="font-thin">{job.workModel}</span>
              </h2>
            </div>
            <ButtonNavigator
              path={`/jobpost/view/${job.id}`}
              text={"View Details"}
            />
          </div>
        </div>
        )
      );
    });

    const changePage = ({selected})=>{
      setPageNumber(selected)
    }
  return (
    <div className="w-9/12 max-w-[1440px] bg-neutral h-screen flex flex-col shadow-xl bg">
  <TopBar />
  <div className="flex flex-row gap-2">
    <SideBar />
    <div className="flex flex-col w-9/12 h-screen bg-white overflow-y-auto  p-5 justify-between">
     <div className="flex flex-col gap-5">
     {displayJobPosts}
     </div>
      <footer className="text-center py-4 bg-white mb-6">
       <ReactPaginate
       previousLabel={"Prev"}
       nextLabel={"Next"}
       pageCount={pageCount}
       onPageChange={changePage}
       className="join flex flex-row w-full justify-center items-center p-2"
       pageClassName="bg-neutral p-2 hover:bg-info active:bg-neutral"
       activeClassName="bg-info"
       previousClassName="bg-neutral p-2 hover:bg-info active:bg-neutral rounded-tl-md rounded-bl-md"
       nextClassName="bg-neutral p-2 hover:bg-info active:bg-neutral rounded-tr-md rounded-br-md"
       />
      </footer>
    </div>
  </div>
</div>
  );
};

export default Homepage;
