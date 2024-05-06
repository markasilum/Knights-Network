import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({catprop,query}) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState(query ||"");
  const [result, setResult] = useState(null);
  const [searchCategory, setSearchCategory] = useState(catprop || "jobpost");
  const[placeholder, setPlaceHolder] = useState()

  useEffect(()=>{
    if(searchCategory == 'jobpost'){
      setPlaceHolder("Search by job title, skill, degree, or license")
    }else if(searchCategory == 'companies'){
      setPlaceHolder("Search by company name")
    }else{
      setPlaceHolder("Search by first name, middle name, last name")
    }
  },[searchCategory])

  const searchJobPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search/jobpost?search=${searchWord}`,
        {
          credentials: "include",
        }
      );

      const responseData = await response.json();
      navigate("/search/jobpost", {
        state: 
        { 
          result: responseData,
          category: searchCategory,
          search: searchWord

        },
      });
      setResult(responseData);
    } catch (error) {}
  };
  
  const searchPeople = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search/people?search=${searchWord}`,
        {
          credentials: "include",
        }
      );

      const responseData = await response.json();
      navigate("/search/people", {
        state: 
        { 
          result: responseData,
          category: searchCategory,
          search: searchWord

        },
      });
      setResult(responseData);
    } catch (error) {}
  };
  const searchCompanies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search/companies?search=${searchWord}`,
        {
          credentials: "include",
        }
      );

      const responseData = await response.json();
      navigate("/search/companies", {
        state: 
        { 
          result: responseData,
          category: searchCategory,
          search: searchWord

        },
      });
      setResult(responseData);
    } catch (error) {}
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
      {/* {result && console.log(result)}
      {console.log(searchCategory)} */}
      <select
        className="select select-bordered w-36 max-w-xs rounded-tl rounded-bl  rounded-none outline-none focus:outline-none focus-within:outline-none"
        defaultValue={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
      >
        <option value={"jobpost"}>Job Posts</option>
        <option value={"companies"}>Companies</option>
        <option value={"people"}>People</option>
      </select>
      <input
        type="text"
        placeholder={placeholder}
        value={searchWord}
        className="input input-bordered w-1/2 text-secondary rounded-tr rounded-br  rounded-none outline-none focus:outline-none focus-within:outline-none "
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
