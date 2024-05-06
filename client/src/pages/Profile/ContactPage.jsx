import React, { useEffect, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddContactPerson from './AddContactPerson';
import EditContactPerson from './EditContactPerson';
const ContactPage = () => {
    const [contactPerson, setContactPerson] = useState([]);

    const fetchContactData = async () => {
      try {
          const response = await fetch("http://localhost:3000/company/contact",{
            credentials:'include'
          });
          const getRes = await response.json();
          setContactPerson(getRes);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
  }
    useEffect(()=>{
        
        fetchContactData()
    },[])
  return (
          <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-row rounded-xl mb-5 justify-between'>

         <div className='flex flex-col'>
         {contactPerson&&(
            contactPerson.map((item)=>(
              <div key={item.id}>
                 <h1 className='text-justify font-semibold flex  gap-3 items-center'>{item.positionName}<button className='hover:bg-neutral hover:rounded-full active:text-info p-1 w-fit h-fit' onClick={()=>document.getElementById(item.id).showModal()}><EditOutlinedIcon fontSize='small'/></button></h1>
                <p className='flex gap-2 items-center'><BadgeOutlinedIcon fontSize='small'/>{item.person.firstName} {item.person.middleName} {item.person.lastName}</p>
                <p className='flex gap-2 items-center'><EmailOutlinedIcon fontSize='small'/>{item.email}</p>
                <p className='flex gap-2 items-center mb-2'><LocalPhoneOutlinedIcon fontSize='small'/>{item.phone}</p>
                <EditContactPerson personData={item} fetchContactData={fetchContactData}/>
            </div>
            ))
                
          )}
         
         </div>
          <button className='hover:bg-neutral hover:rounded-full active:text-info p-1 w-fit h-fit' onClick={()=>document.getElementById("addContact").showModal()}><AddOutlinedIcon fontSize='medium'/></button>
          <AddContactPerson fetchContactData={fetchContactData}/>
        </div>  
  )
}

export default ContactPage