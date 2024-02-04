import React, { useEffect } from 'react'

const PersonAbout = ({userData}) => {
  return (
    <div className='overflow-auto-y w-full  bg-white h-fit max-h-96 mt-3 p-5 flex flex-col rounded-xl mb-5'>
        <p className='text-justify'>{userData.biography}</p>
    </div>
  )
}

export default PersonAbout