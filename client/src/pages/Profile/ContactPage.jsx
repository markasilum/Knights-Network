import React, { useEffect, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
const ContactPage = () => {
    const [contactPerson, setContactPerson] = useState('');

    useEffect(()=>{
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
        fetchContactData()
    },[])
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
         
          {contactPerson&&(
            <div>
                 <h1 className='text-justify font-semibold'>{contactPerson.positionName}</h1>
                <p className='flex gap-2 items-center'><BadgeOutlinedIcon fontSize='small'/>{contactPerson.person.firstName} {contactPerson.person.middleName} {contactPerson.person.lastName}</p>
                <p className='flex gap-2 items-center'><EmailOutlinedIcon fontSize='small'/>{contactPerson.email}</p>
                <p className='flex gap-2 items-center'><LocalPhoneOutlinedIcon fontSize='small'/>{contactPerson.phone}</p>

            </div>
                
          )}
        </div>  
  )
}

export default ContactPage