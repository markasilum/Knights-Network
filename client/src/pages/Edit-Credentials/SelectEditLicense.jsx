import React from 'react'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'
import { useLocation } from 'react-router-dom';

const SelectEditLicense = () => {
    const{licenses} = useLocation();
    

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-scroll">
            <div className="w-full bg-white h-fit p-5 rounded-xl mb-2">
              <div className="flex flex-col">
                <div className="border-b-2 border-dashed border-info"></div>
                {console.log(licenses)}
                {/* {licenses.map((license) => (
                  <div key={license.id} className="flex flex-row justify-between items-center border-b-2 border-dashed border-info mt-2">
                    <div className="flex flex-col ">
                        <span className="font-semibold">{experience.jobTitle}</span>
                        <span className="">{experience.companyName}</span>
                    </div>
                    
                    <div className="mb-3">
                    <button className='font-thin underline' onClick={()=>document.getElementById(experience.id).showModal()}>Edit</button>
                    <EditExperience expData={experience}/>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectEditLicense