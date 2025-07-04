import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import EditExperience from "./EditExperience";
import DeleteExperience from "./DeleteExperience";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const SelectEditExperience = () => {
  const [experience, setExperience] = useState([]);

  const fetchExperience = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/experience/person/index`,{
          credentials:'include'
        }
      );
      const getUserResult = await response.json();
      setExperience(getUserResult);
      // console.log(getUserResult)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleDelete = async (id) =>{
    console.log("handleDelete called", id)
    try {
      const response = await fetch(
        `http://localhost:3000/experience/delete?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      fetchExperience();
    } catch (error) {
      console.error("Error deleting experience:", error);
  };
}

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />

        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-2 pr-2 overflow-scroll">
            <div className="w-full bg-white h-fit p-5 rounded-xl mb-2">
              <div className="flex flex-col">
              <div className='font-semibold mb-5'>Edit Experience</div>
                <div className="border-b-2 border-dashed border-info"></div>
                {experience.map((experience) => (
                  <div key={experience.id} className="flex flex-row justify-between items-center border-b-2 border-dashed border-info mt-2">
                    <div className="flex flex-col ">
                        <span className="font-semibold">{experience.jobTitle}</span>
                        <span className="">{experience.companyName}</span>
                    </div>
                    
                    <div className="mb-3 flex flex-row gap-3">
                    <button className='hover:bg-neutral hover:rounded-full active:text-info p-1' onClick={()=>document.getElementById(experience.id).showModal()}><EditOutlinedIcon fontSize='medium'/></button>
                    <button className="hover:text-error hover:rounded-full hover:bg-neutral active:text-info p-1" onClick={()=>document.getElementById(experience.jobTitle).showModal()}><DeleteOutlinedIcon fontSize="medium"/></button>

                    <EditExperience expData={experience} fetchExperience={fetchExperience}/>
                    <DeleteExperience experience={experience} handleDelete={handleDelete}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectEditExperience;
