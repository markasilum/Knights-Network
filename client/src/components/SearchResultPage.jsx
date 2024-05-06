import React from "react";
import TopBar from "./topbar";
import SideBar from "./SideBar";
import { Link, useLocation } from "react-router-dom";
import JobPostCardResult from "./JobPostCardResult";
import JobPostCard from "./JobPostCard";

const SearchResultPage = () => {
  const location = useLocation();
  const result = location.state.result;
  const category = location.state.category;
  const search = location.state.search;


  return (
    <div className="w-9/12 max-w-[1440px] bg-neutral h-screen flex flex-col shadow-xl bg">
      {console.log(category)}
      <TopBar catProp={category} query={search}/>
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="">
            <div className="w-full bg-white h-screen p-2 pt-2 mb-20 overflow-y-auto">
              <JobPostCardResult jobData={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
