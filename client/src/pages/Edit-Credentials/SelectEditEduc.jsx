import React from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useEffect } from "react";
import EditEducation from "./EditEducation";
const SelectEditEduc = () => {
  const [degree, setDegree] = useState([]);
  const [educData, setEducData] = useState([]);
  const[indivDegree, setIndivDegree] = useState("");

  useEffect(() => {
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
    fetchEducation();
  }, []);

  function getDegree(id){
    let degreeName = ""
    degree.map((deg)=>{
        if(id = deg.id){
            degreeName = deg.degreeName
        }
    })
    // console.log(degreeName)
    return degreeName

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
                    <div className="mb-3">
                    <button className='font-thin underline' onClick={()=>document.getElementById(education.id).showModal()}>Edit</button>
                    

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
