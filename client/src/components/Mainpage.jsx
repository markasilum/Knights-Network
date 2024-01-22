import React from 'react'
import TopBar from './topbar'
import SideBar from './SideBar'
import HomePage from './HomePage'

const Mainpage = () => {
  return (
    <div className='w-9/12 bg-black h-screen flex flex-col'>
        <TopBar/>
        
        <div className='flex flex-row'>
            <SideBar/>
            <HomePage/>
        </div>
        
    </div>
  )
}

export default Mainpage