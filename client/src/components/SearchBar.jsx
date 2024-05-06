import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState();
  const [result, setResult] = useState(null);
  const [searchCategory, setSearchCategory] = useState("jobpost");

  const searchJobPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search/jobpost?search=${searchWord}`,
        {
          credentials: "include",
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      navigate("/search/result", {
        state: { result: responseData },
      });
      setResult(responseData);
    } catch (error) {}
  };
  const searchPeople = async () => {
    console.log("call search people api")
  };
  const searchCompanies = async () => {
    console.log("call search companies api")
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        if(searchCategory == 'jobpost'){
            searchJobPost();
        }else if(searchCategory == 'companies'){
            searchCompanies()
        }else if(searchCategory == 'people'){
            searchPeople()
        }
    }
  };
  return (
    <div className="form-control w-full flex flex-row justify-start text-black ">
      {result && console.log(result)}
      {console.log(searchCategory)}
      <select
        className="select select-bordered w-36 max-w-xs rounded-tl rounded-bl  rounded-none outline-none focus:outline-none focus-within:outline-none"
        defaultValue={"Job Posts"}
        onChange={(e) => setSearchCategory(e.target.value)}
      >
        <option value={"jobpost"}>Job Posts</option>
        <option value={"companies"}>Companies</option>
        <option value={"people"}>People</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-1/2 text-secondary rounded-tr rounded-br  rounded-none outline-none focus:outline-none focus-within:outline-none "
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
