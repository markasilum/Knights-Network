import React from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useEffect } from "react";
import EditCerts from "./EditCerts";
const SelectEditCerts = () => {
    const[certs, setCerts] = useState([])

    useEffect(()=>{
        const fetchCerts = async () =>{
          try {
            const response = await fetch(`http://localhost:3000/certification/person/index`);
            const getUserResult = await response.json();
            setCerts(getUserResult);
            // console.log(getUserResult)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchCerts()
        
      },[]);
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />

        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-scroll">
            <div className="w-full bg-white h-fit p-5 rounded-xl mb-2">
              <div className="flex flex-col">
              <div className='font-semibold mb-5'>Edit Experience</div>
                <div className="border-b-2 border-dashed border-info"></div>
                {certs.map((cert) => (
                  <div key={cert.id} className="flex flex-row justify-between items-center border-b-2 border-dashed border-info mt-2">
                     <div className="flex flex-col ">
                        <span className='mb-3'>{cert.certName}</span>
                    </div>
                    
                    <div className="mb-3">
                    <button className='font-thin underline' onClick={()=>document.getElementById(cert.id).showModal()}>Edit</button>
                   <EditCerts certData={cert}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectEditCerts