import React from 'react'
import TopBar from './topbar'
import SideBar from './SideBar'
import HomePage from './HomePage'

const Mainpage = () => {
  return (
    <div className='w-9/12 bg-neutral  h-screen flex flex-col shadow-xl' >
        <TopBar/>
        
        <div className='flex flex-row gap-2'>
            <SideBar/>
            <HomePage/>
        </div>
        
    </div>
  )
}

export default Mainpage