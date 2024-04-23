import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'
import { useLocation } from 'react-router-dom';
import EditLicense from './EditLicense';

const SelectEditLicense = () => {
    const[licenses, setLicense] = useState([])

    useEffect(()=>{
    const fetchLicense = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/license/person/index`,{
          credentials:'include'
        });
        const getUserResult = await response.json();
        setLicense(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchLicense()
    
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
              <div className='font-semibold mb-5'>Edit License</div>
                <div className="border-b-2 border-dashed border-info"></div>
                {/* {console.log(licenses)} */}
                {licenses.map((license) => (
                  <div key={license.id} className="flex flex-row justify-between items-center border-b-2 border-dashed border-info mt-2">
                    <div className="flex flex-col ">
                        <span className='mb-3'>{license.licenseName}</span>
                    </div>
                    
                    <div className="mb-3">
                    <button className='font-thin underline' onClick={()=>document.getElementById(license.id).showModal()}>Edit</button>
                      <EditLicense licenseData={license}/>
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

export default SelectEditLicense