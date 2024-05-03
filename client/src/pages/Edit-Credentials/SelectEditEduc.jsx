import React from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useEffect } from "react";
import EditEducation from "./EditEducation";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DateToWords from "../../components/DateFormatter";

const SelectEditEduc = () => {
  const [degree, setDegree] = useState([]);
  const [educData, setEducData] = useState([]);

  const fetchEducation = async () => {
    try {
      const response = await fetch("http://localhost:3000/education/index",{
        credentials:'include'
      });
      const getEducRes = await response.json();
      // setDegreeId(getEducRes.map(educ => educ.degreeId))
      setEducData(getEducRes);

      const degreeIds = getEducRes.map((educ) => educ.degreeId);

      const fetchDegree = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/degree/index?ids=${degreeIds.join(",")}`,{
              credentials:'include'
            }
          );
          const getUserResult = await response.json();
          setDegree(getUserResult);
          // console.log(getUserResult)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchDegree();

      // console.log(getEducRes)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleDelete = async (id) =>{
    try {
      const response = await fetch(
        `http://localhost:3000/education/delete?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      fetchEducation();
    } catch (error) {
      console.error("Error deleting education:", error);
  };
}
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />

        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-scroll">
            <div className="w-full bg-white h-fit p-5 rounded-xl mb-2">
              <div className="flex flex-col">
              <div className='font-semibold mb-5'>Edit Education</div>
                <div className="border-b-2 border-dashed border-info"></div>
                {educData.map((education) => (
                  <div key={education.id} className='flex flex-row justify-between items-center border-b-2 border-dashed border-info mt-2'>
                    <div className="flex flex-col ">
                    <span className="font-semibold">
                      {education.schoolName}
                    </span>
                    {degree.find((deg) => deg.id === education.degreeId) && (
                      
                      <span className="mb-3">
                        {
                          degree.find((deg) => deg.id === education.degreeId).degreeName
                          
                          
                        }
                        {/* {
                          setIndivDegree( degree.find((deg) => deg.id === education.degreeId).degreeName)
                        } */}
                      </span>
                    )}
                    

                    </div>
                    <div className="mb-3 flex flex-row">
                    <button className='font-thin underline' onClick={()=>document.getElementById(education.id).showModal()}>Edit</button>
                    
                    <button className="hover:text-error active:text-info p-1" onClick={()=>document.getElementById(education.degreeId).showModal()}><DeleteOutlinedIcon fontSize="medium"/></button>

                              <dialog id={education.degreeId} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                  </form>
                                  <h3 className="font-bold text-lg mb-3 border-b-2">Delete Education?</h3>
                                  <p>{education.id}</p>
                                  <p className=" text-md font-semibold">{education.schoolName}</p>
                                  <p className=" text-md">{education.degree.degreeName}</p>
                                  <p className=" text-md">QPI: {education.qpi}</p>
                                  <div className="flex flex-row gap-1">
                                  <span className="font-thin">
                                    <DateToWords dateString={education.startDate} />
                                  </span>
                                  <span className="font-thin">-</span>
                                  <span className="font-thin">
                                    <DateToWords dateString={education.endDate} />
                                  </span>
                                </div>


                                  <div className="modal-action ">
                                    <form method="dialog">
                                      <button className="btn btn-error text-white" onClick={()=>handleDelete(education.id)}>Archive</button>
                                    </form>
                                  </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                  <button>close</button>
                                </form>
                              </dialog>
                    </div>
                        <EditEducation educationData={education} degreeData={degree}/>

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

export default SelectEditEduc;
