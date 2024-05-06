import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'
import { useLocation } from 'react-router-dom';
import EditLicense from './EditLicense';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteLicense from './DeleteLicense';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const SelectEditLicense = () => {
    const[licenses, setLicense] = useState([])

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

    useEffect(()=>{
    fetchLicense() 
  },[]);
  
  const handleDelete = async (id) =>{
    try {
      const response = await fetch(
        `http://localhost:3000/license/delete?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      fetchLicense();
    } catch (error) {
      console.error("Error deleting experience:", error);
  };
}
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      {    console.log(licenses)
}
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-2 pr-2 overflow-scroll">
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
                    
                    <div className="mb-3 flex flex-row gap-3">
                    <button className='hover:bg-neutral hover:rounded-full active:text-info p-1' onClick={()=>document.getElementById(license.id).showModal()}><EditOutlinedIcon fontSize='medium'/></button>
                    <button className="hover:text-error hover:rounded-full hover:bg-neutral active:text-info p-1" onClick={()=>document.getElementById("delete"+license.id).showModal()}><DeleteOutlinedIcon fontSize="medium"/></button>
      
                      <EditLicense licenseData={license}/>
                      <DeleteLicense license={license} handleDelete={handleDelete}/>
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