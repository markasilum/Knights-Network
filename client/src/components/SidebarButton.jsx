import React from 'react'

const SidebarButton = ({onCick, text}) => {
  return (
    // <div className='w-full border-solid	border-2 h-12 flex flex-col justify-center p-5'>{text}</div>

    <li className='bg-neutral rounded-lg hover:bg-secondary hover:text-white'><a>{text}</a></li>
      
  )
}

export default SidebarButton